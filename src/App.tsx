import { SearchFilter } from "./components/SearchFilter/SearchFilter"
import { ProfessionalCard } from "./components/ProfessionalCard/ProfessionalCard"


function App() {
  return (
    <main className="flex flex-col items-center h-full">
      <div className="w-full h-full">
        <div className="flex flex-col flex-1">
          <section className="w-full flex flex-col items-center bg-[#f1f9ff] py-10">
            <div className="flex justify-between max-w-[1200px]">
              <div className="flex w-full justify-between gap-14 px-2 xs:px-7 py-10 lg:py-0 lg:px-0">
                <SearchFilter />
                <ProfessionalCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export { App }
