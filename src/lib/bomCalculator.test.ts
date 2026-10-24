import test from "node:test";
import assert from "node:assert";
import { calculateRialBOM } from "./bomCalculator.ts";
type ConfiguratorState = any;

test("calculateRialBOM", async (t) => {
  await t.test("calculates correct BOM for double carport", () => {
    const config = {
      category: "double",
      spots: 2,
      material: "aluminum",
      moduleType: "standard",
      wallbox: false,
      wallboxType: "standard",
      battery: false,
      batterySize: "15",
      ledLighting: false
    } as unknown as ConfiguratorState;

    const result = calculateRialBOM(config);

    assert.strictEqual(result.moduleCount, 16);
    assert.strictEqual(result.kwp, 7.5);
    assert.strictEqual(result.postCount, 4);
    assert.strictEqual(result.purlinCount, 15);
    assert.strictEqual(result.clampCount, 64);
  });

  await t.test("calculates correct BOM for commercial carport", () => {
    const config = {
      category: "commercial",
      spots: 10,
      material: "steel",
      moduleType: "translucent",
      wallbox: true,
      wallboxType: "v2x",
      battery: true,
      batterySize: "30",
      ledLighting: true
    } as unknown as ConfiguratorState;

    const result = calculateRialBOM(config);

    assert.strictEqual(result.moduleCount, 40);
    assert.strictEqual(result.kwp, 18.8);
    assert.strictEqual(result.postCount, 12);
    assert.strictEqual(result.purlinCount, 36);
    assert.strictEqual(result.clampCount, 160);

    const items = result.items;
    assert.ok(items.find((i: any) => i.sku === "EV-WB-V2X-22KW-ISO"));
    assert.ok(items.find((i: any) => i.sku === "BAT-LFP-30K-HV"));
    assert.ok(items.find((i: any) => i.sku === "LED-PRO-IP67-RAL"));
    assert.ok(items.find((i: any) => i.sku === "PV-GLASS-BIF-450-CLR"));
    assert.ok(items.find((i: any) => i.sku === "RAL-STL-POST-3000"));
  });
});
