"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PlotterCalculator = () => {
  // Dimensiones del plotter en cm (24 pulgadas = 61 cm)
  const PLOTTER_WIDTH = 61;
  const CUTTING_MARGIN = 0.3; // 3mm de margen entre stickers para corte

  const [costs, setCosts] = useState({
    paperCost: 0, // Costo del rollo por metro
    inkCost: 0, // Costo de tinta por metro
    electricityCost: 0, // Costo de electricidad por hora
    laborCost: 0, // Costo de mano de obra por hora
  });

  const [stickerSizes] = useState([
    { name: "Pequeño", width: 5, height: 5 },
    { name: "Mediano", width: 7, height: 7 },
    { name: "Grande", width: 10, height: 10 },
  ]);

  const calculateStickersPerMeter = (
    stickerWidth: number,
    stickerHeight: number
  ) => {
    // Calcular cuántos stickers caben en el ancho del plotter
    const stickersPerRow = Math.floor(
      (PLOTTER_WIDTH - 1) / (stickerWidth + CUTTING_MARGIN)
    );

    // Calcular cuántos stickers caben en un metro de largo
    const stickersPerColumn = Math.floor(
      100 / (stickerHeight + CUTTING_MARGIN)
    );

    return {
      perRow: stickersPerRow,
      perColumn: stickersPerColumn,
      total: stickersPerRow * stickersPerColumn,
    };
  };

  const calculateCostsPerMeter = () => {
    const hourlyOperatingCost = costs.electricityCost + costs.laborCost;
    // Asumiendo que se tarda aproximadamente 10 minutos en imprimir un metro
    const operatingCostPerMeter = hourlyOperatingCost / 6;

    return costs.paperCost + costs.inkCost + operatingCostPerMeter;
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Calculadora de Producción - Epson T1370
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Costos de Producción</h3>

              <div className="space-y-2">
                <Label>Costo del papel por metro</Label>
                <Input
                  type="number"
                  onFocus={(e) => e.target.select()}
                  step="0.01"
                  value={costs.paperCost}
                  onChange={(e) =>
                    setCosts({ ...costs, paperCost: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Costo de tinta por metro</Label>
                <Input
                  type="number"
                  onFocus={(e) => e.target.select()}
                  step="0.01"
                  value={costs.inkCost}
                  onChange={(e) =>
                    setCosts({ ...costs, inkCost: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Costo de electricidad por hora</Label>
                <Input
                  type="number"
                  onFocus={(e) => e.target.select()}
                  step="0.01"
                  value={costs.electricityCost}
                  onChange={(e) =>
                    setCosts({
                      ...costs,
                      electricityCost: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Costo de mano de obra por hora</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={costs.laborCost}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setCosts({ ...costs, laborCost: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold">
                  Costo total por metro: ${calculateCostsPerMeter().toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Capacidad de Producción por Metro
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Tamaño</th>
                      <th className="p-2 border">Por Fila</th>
                      <th className="p-2 border">Por Columna</th>
                      <th className="p-2 border">Total por Metro</th>
                      <th className="p-2 border">Área Utilizada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stickerSizes.map((size) => {
                      const production = calculateStickersPerMeter(
                        size.width,
                        size.height
                      );
                      const areaUtilization =
                        ((production.total * size.width * size.height) /
                          (PLOTTER_WIDTH * 100)) *
                        100;

                      return (
                        <tr key={size.name}>
                          <td className="p-2 border">
                            {size.name} ({size.width}x{size.height}cm)
                          </td>
                          <td className="p-2 border text-center">
                            {production.perRow}
                          </td>
                          <td className="p-2 border text-center">
                            {production.perColumn}
                          </td>
                          <td className="p-2 border text-center">
                            {production.total}
                          </td>
                          <td className="p-2 border text-center">
                            {areaUtilization.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Producción Total del Rollo (50m)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Tamaño</th>
                        <th className="p-2 border">Stickers Totales</th>
                        <th className="p-2 border">Costo por Sticker</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stickerSizes.map((size) => {
                        const production = calculateStickersPerMeter(
                          size.width,
                          size.height
                        );
                        const totalStickers = production.total * 50;
                        const costPerSticker =
                          (calculateCostsPerMeter() * 50) / totalStickers;

                        return (
                          <tr key={size.name}>
                            <td className="p-2 border">
                              {size.name} ({size.width}x{size.height}cm)
                            </td>
                            <td className="p-2 border text-center">
                              {totalStickers.toLocaleString()}
                            </td>
                            <td className="p-2 border text-center">
                              ${costPerSticker.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
