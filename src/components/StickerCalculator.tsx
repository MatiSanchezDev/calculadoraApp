/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const StickerCalculator = () => {
  const printRef = useRef(null); // Referencia al área que se imprimirá
  const [materialCosts, setMaterialCosts] = useState({
    vinilPrice: 0, // Precio por metro cuadrado de vinil
    inkPrice: 0, // Precio por ml de tinta
  });

  const [sizes, setSizes] = useState({
    small: { width: 5, height: 5, price: 0 }, // 5x5 cm
    medium: { width: 7, height: 7, price: 0 }, // 7x7 cm
    large: { width: 10, height: 10, price: 0 }, // 10x10 cm
    custom: { width: 0, height: 0, price: 0 }, // Medida personalizada
  });

  const [operationalCosts, setOperationalCosts] = useState({
    electricity: 0, // Costo por hora de electricidad
    labor: 0, // Costo por hora de mano de obra
    maintenance: 0, // Costo de mantenimiento por hora
  });

  const calculateCostPerSize = (width: number, height: number) => {
    // Convertir medidas a metros cuadrados
    const areaInM2 = (width * height) / 10000;

    // Cálculo de material
    const materialCost = areaInM2 * materialCosts.vinilPrice;

    // Cálculo estimado de tinta (asumiendo un uso promedio por área)
    const inkCost = areaInM2 * materialCosts.inkPrice;

    // Cálculo de costos operativos por sticker (asumiendo tiempo promedio de producción)
    const timePerSticker = areaInM2 * 10; // Tiempo estimado en minutos
    const operationalCostPerSticker =
      (operationalCosts.electricity +
        operationalCosts.labor +
        operationalCosts.maintenance) *
      (timePerSticker / 60);

    const totalCost = materialCost + inkCost + operationalCostPerSticker;
    return totalCost;
  };

  const calculateMargin = (cost: number, price: number) => {
    if (price === 0) return 0;
    return (((price - cost) / price) * 100).toFixed(2);
  };

  // Función para imprimir solo el contenido dentro del `printRef`
  const handlePrint = () => {
    const printContent: any = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML; // Reemplaza el contenido
    window.print();
    document.body.innerHTML = originalContent; // Restaura el contenido
    window.location.reload(); // Recarga la página para evitar errores
  };

  const fechaArgentina = new Date().toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full h-auto mt-6 flex flex-col justify-center items-center">
      {/* Botón para imprimir */}
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        🖨️ Imprimir
      </button>
      <div ref={printRef}>
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Calculadora de Costos por Tamaño de Stickers
            </CardTitle>
            <div className="text-center">📆 {fechaArgentina} 📆</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Costos de Materiales</h3>

                <div className="space-y-2">
                  <Label>Precio del Vinil (por m²)</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={materialCosts.vinilPrice}
                    onChange={(e) =>
                      setMaterialCosts({
                        ...materialCosts,
                        vinilPrice: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Precio de la Tinta (por ml)</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={materialCosts.inkPrice}
                    onChange={(e) =>
                      setMaterialCosts({
                        ...materialCosts,
                        inkPrice: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <h3 className="text-lg font-semibold mt-6">
                  Costos Operativos (por hora)
                </h3>

                <div className="space-y-2">
                  <Label>Electricidad</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={operationalCosts.electricity}
                    onChange={(e) =>
                      setOperationalCosts({
                        ...operationalCosts,
                        electricity: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mano de obra</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={operationalCosts.labor}
                    onChange={(e) =>
                      setOperationalCosts({
                        ...operationalCosts,
                        labor: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mantenimiento</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={operationalCosts.maintenance}
                    onChange={(e) =>
                      setOperationalCosts({
                        ...operationalCosts,
                        maintenance: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Precios de Venta por Tamaño
                </h3>

                <div className="space-y-2">
                  <Label>Pequeño (5x5 cm)</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={sizes.small.price}
                    onChange={(e) =>
                      setSizes({
                        ...sizes,
                        small: {
                          ...sizes.small,
                          price: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mediano (7x7 cm)</Label>
                  <Input
                    type="number"
                    onFocus={(e) => e.target.select()}
                    step="0.01"
                    value={sizes.medium.price}
                    onChange={(e) =>
                      setSizes({
                        ...sizes,
                        medium: {
                          ...sizes.medium,
                          price: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Grande (10x10 cm)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    onFocus={(e) => e.target.select()}
                    value={sizes.large.price}
                    onChange={(e) =>
                      setSizes({
                        ...sizes,
                        large: {
                          ...sizes.large,
                          price: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medida Personalizada</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      onFocus={(e) => e.target.select()}
                      placeholder="Ancho (cm)"
                      value={sizes.custom.width}
                      onChange={(e) =>
                        setSizes({
                          ...sizes,
                          custom: {
                            ...sizes.custom,
                            width: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Alto (cm)"
                      value={sizes.custom.height}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        setSizes({
                          ...sizes,
                          custom: {
                            ...sizes.custom,
                            height: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={sizes.custom.price}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setSizes({
                        ...sizes,
                        custom: {
                          ...sizes.custom,
                          price: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Análisis de Costos y Márgenes
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Tamaño</th>
                      <th className="p-2 border">Dimensiones</th>
                      <th className="p-2 border">Costo Total</th>
                      <th className="p-2 border">Precio de Venta</th>
                      <th className="p-2 border">Margen (%)</th>
                      <th className="p-2 border">Ganancia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Pequeño</td>
                      <td className="p-2 border">5x5 cm</td>
                      <td className="p-2 border">
                        ${calculateCostPerSize(5, 5).toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        ${sizes.small.price.toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        {calculateMargin(
                          calculateCostPerSize(5, 5),
                          sizes.small.price
                        )}
                        %
                      </td>
                      <td className="p-2 border">
                        $
                        {(
                          sizes.small.price - calculateCostPerSize(5, 5)
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Mediano</td>
                      <td className="p-2 border">7x7 cm</td>
                      <td className="p-2 border">
                        ${calculateCostPerSize(7, 7).toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        ${sizes.medium.price.toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        {calculateMargin(
                          calculateCostPerSize(7, 7),
                          sizes.medium.price
                        )}
                        %
                      </td>
                      <td className="p-2 border">
                        $
                        {(
                          sizes.medium.price - calculateCostPerSize(7, 7)
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Grande</td>
                      <td className="p-2 border">10x10 cm</td>
                      <td className="p-2 border">
                        ${calculateCostPerSize(10, 10).toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        ${sizes.large.price.toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        {calculateMargin(
                          calculateCostPerSize(10, 10),
                          sizes.large.price
                        )}
                        %
                      </td>
                      <td className="p-2 border">
                        $
                        {(
                          sizes.large.price - calculateCostPerSize(10, 10)
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Personalizado</td>
                      <td className="p-2 border">
                        {sizes.custom.width}x{sizes.custom.height} cm
                      </td>
                      <td className="p-2 border">
                        $
                        {calculateCostPerSize(
                          sizes.custom.width,
                          sizes.custom.height
                        ).toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        ${sizes.custom.price.toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        {calculateMargin(
                          calculateCostPerSize(
                            sizes.custom.width,
                            sizes.custom.height
                          ),
                          sizes.custom.price
                        )}
                        %
                      </td>
                      <td className="p-2 border">
                        $
                        {(
                          sizes.custom.price -
                          calculateCostPerSize(
                            sizes.custom.width,
                            sizes.custom.height
                          )
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
