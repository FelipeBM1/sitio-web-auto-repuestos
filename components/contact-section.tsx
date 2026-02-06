import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Mail } from "lucide-react"

export function ContactSection() {
  const address =
    "Avenida Mauricio Báez, no.28, Cotuí, provincia Sánchez Ramírez, República Dominicana"

  const placeForMap = "Auto Repuestos Carlos, 3V62+J54, Cotuí 43000, República Dominicana"
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(placeForMap)}&output=embed`

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">CONTÁCTANOS</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                <iframe
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">8092401530</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">ventasrepuestoscarlos@gmail.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6">Horario de Atención</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Lunes a Sábado</h4>
                    <p className="text-lg">8:00 A.M. a 12:30 P.M.</p>
                    <p className="text-lg">2:00 P.M. a 6:00 P.M.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/30">
                  <p className="text-lg mb-4">
                    ¡Visítanos y descubre nuestra amplia gama de productos para tu vehículo!
                  </p>
                  <p className="text-white/90">
                    Contamos con personal capacitado para asesorarte en la selección del repuesto adecuado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
