import { NextRequest, NextResponse } from 'next/server';
import { calculateRialBOM } from '@/lib/bomCalculator';
import { ConfiguratorState } from '@/components/configurator/Interactive2DRenderer';

/**
 * Standardized Model Context Protocol (MCP) & JSON-RPC Agent Tool Endpoint
 * Tool Name: solar_carport_sizer
 * Description: Calculates structural statics, bifacial energy yields, and RIAL Energy ERP BOM cut-lists for solar carports.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both direct arguments and JSON-RPC / MCP tool call envelopes
    const args = body.params?.arguments || body.arguments || body;

    const category = args.category || 'double';
    const spots = args.spots ? parseInt(args.spots, 10) : (category === 'commercial' ? 10 : category === 'double' ? 2 : 1);
    const material = args.material === 'steel' ? 'steel' : 'aluminum';
    const postColor = args.postColor === 'silver' ? 'silver' : 'anthracite';
    const moduleType = args.moduleType === 'translucent' ? 'translucent' : 'dark';
    const wallbox = args.wallbox !== false;
    const wallboxType = args.wallboxType === 'standard' ? 'standard' : 'v2x';
    const battery = Boolean(args.battery);
    const batterySize = (args.batterySize || '15') as ConfiguratorState['batterySize'];
    const ledLighting = args.ledLighting !== false;
    const assemblyService = args.assemblyService !== false;

    const config: ConfiguratorState = {
      category,
      spots,
      material,
      postColor,
      moduleType,
      wallbox,
      wallboxType,
      battery,
      batterySize,
      ledLighting,
      assemblyService,
    };

    const bomResult = calculateRialBOM(config);

    // Yield physics
    const surfaceAlbedo = args.groundSurface === 'gravel' ? 0.23 : args.groundSurface === 'snow' ? 0.28 : 0.196;
    const annualKwhYield = Math.round(bomResult.kwp * 980 * (1 + surfaceAlbedo));
    const annualSavingsEur = Math.round(annualKwhYield * 0.34);

    const toolResult = {
      tool: 'solar_carport_sizer',
      status: 'success',
      systemSpecification: {
        category,
        spots,
        pvCapacityKwp: bomResult.kwp,
        moduleCount: bomResult.moduleCount,
        moduleType: moduleType === 'translucent' ? '450W Translucent (20% Light)' : '470W Bifacial TOPCon Full Black',
        structuralMaterial: material === 'aluminum' ? 'Extruded T6 Aluminum' : 'Hot-Dip Galvanized S355 Steel',
        snowLoadCapacityKnM2: bomResult.snowLoadCapacityKnM2,
        windLoadCapacityKmH: bomResult.windLoadCapacityKmH,
        totalWeightKg: bomResult.totalWeightKg,
        estimatedFreightPallets: bomResult.estimatedPallets,
      },
      energyAndEconomics: {
        annualYieldKwh: annualKwhYield,
        annualSavingsEur: annualSavingsEur,
        co2OffsetKgPerYear: Math.round(annualKwhYield * 0.42),
        vatRate: '0% (§ 12 Abs. 3 UStG)',
      },
      rialEnergyBOMCutList: bomResult.items.map(item => ({
        sku: item.sku,
        description: item.description,
        quantity: item.qty,
        unit: item.unit,
        category: item.category,
        warehouseAvailability: item.stockStatus,
      })),
      logisticsHub: {
        warehouseLocation: 'Seesen (Lower Saxony, Germany)',
        dispatchLeadDays: bomResult.seesenDispatchLeadDays,
        freightMode: 'Direct Crane Truck / Freight Logistics',
      },
    };

    // If client requested JSON-RPC 2.0 format
    if (body.jsonrpc === '2.0') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id || 1,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(toolResult, null, 2),
            }
          ]
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: toolResult,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      }
    });
  } catch (error: any) {
    console.error('Agentic sizer tool error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error executing solar sizer tool' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Returns MCP tool schema declaration
  const toolDefinition = {
    name: 'solar_carport_sizer',
    description: 'Calculates DIN EN 1991 statics, albedo bifacial yields, and RIAL Energy ERP SKU BOM cut-lists for solar carports in Germany and Europe.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['single', 'double', 'terrace', 'commercial'],
          description: 'Type of carport or canopy structure.',
        },
        spots: {
          type: 'integer',
          description: 'Number of parking spaces (e.g. 1, 2, 10, 50).',
        },
        material: {
          type: 'string',
          enum: ['aluminum', 'steel'],
          description: 'Structural framing material.',
        },
        moduleType: {
          type: 'string',
          enum: ['dark', 'translucent'],
          description: 'PV module type (Dark Full-Black or Translucent Glass-Glass).',
        },
        groundSurface: {
          type: 'string',
          enum: ['concrete', 'gravel', 'asphalt', 'snow'],
          description: 'Ground albedo reflectance surface.',
        },
        wallbox: {
          type: 'boolean',
          description: 'Include EV charging wallbox.',
        },
        wallboxType: {
          type: 'string',
          enum: ['standard', 'v2x'],
          description: 'Wallbox type (11kW standard or 22kW Bidirectional V2X).',
        },
        battery: {
          type: 'boolean',
          description: 'Include high-voltage battery storage.',
        },
        batterySize: {
          type: 'string',
          enum: ['10', '15', '30'],
          description: 'Battery storage capacity in kWh.',
        },
      },
      required: ['category'],
    },
  };

  return NextResponse.json({
    tools: [toolDefinition],
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}
