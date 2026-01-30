export function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">QUIÉNES SOMOS</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg max-w-4xl mx-auto leading-relaxed text-muted-foreground">
            Hoy, con más de 21 años de servicio ininterrumpido y más de 35 años de experiencia acumulada en el sector
            automotriz, Auto Repuestos Carlos representa una historia de crecimiento, esfuerzo y compromiso con el
            desarrollo económico local.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-primary text-white rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-6">MISIÓN</h3>
            <p className="text-lg leading-relaxed">
              Satisfacer las necesidades de repuestos para vehículos, supliendo productos de calidad a precios
              competitivos, de manera diligente y con un servicio de excelencia.
            </p>
          </div>

          <div className="bg-black text-white rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-6">VISIÓN</h3>
            <p className="text-lg leading-relaxed">
              Ser la empresa líder en soluciones de repuestos automotrices de la región Cibao sur, reconocida por su
              competitividad, de manera diligente y con un servicio de excelencia.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-8 text-secondary">VALORES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Excelencia en el servicio", "Sentido Humano", "Profesionalidad", "Innovación"].map((valor, index) => (
              <div
                key={index}
                className="bg-primary text-white p-6 rounded-lg text-center font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                {valor}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              Somos una empresa dedicada a la venta de repuestos y accesorios de vehículos, caracterizada por su pasión
              y compromiso en brindar soluciones con el mejor servicio.
            </p>
            <p className="text-lg leading-relaxed">
              Supliendo artículos de calidad, de manera oportuna y diligente, para lograr la satisfacción de los
              clientes.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img src="/images/Tienda.jpeg" alt="Tienda Auto Repuestos Carlos" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
