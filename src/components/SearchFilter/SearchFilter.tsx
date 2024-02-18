import axios from 'axios'
import { useState, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedDoenca, setSelectedDoenca] = useState<string>('')
  const [selectedEspecialidade, setSelectedEspecialidade] = useState<string>('')
  const [selectedAtendimento, setSelectedAtendimento] = useState<string>('')
  const [selectedConvenio, setSelectedConvenio] = useState<string>('')
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [symptoms, setSymptoms] = useState<Option[]>([])
  const [specialities, setSpecialities] = useState<Option[]>([])
  const [healthInsurances, setHealthInsurances] = useState<Option[]>([])

  useEffect(() => {
    const fetchDataOptions = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<Option[]>>
    ) => {
      try {
        const response = await axios.get<Option[]>(url)
        setter(response.data)
      } catch (error) {
        console.error(`Erro ao buscar dados da API (${url}):`, error)
      }
    }

    fetchDataOptions('http://127.0.0.1:3000/symptoms', setSymptoms)
    fetchDataOptions('http://127.0.0.1:3000/specialities', setSpecialities)
    fetchDataOptions('http://127.0.0.1:3000/healthInsurance', setHealthInsurances)
  }, [])

  const fetchDataApi = async (url: any) => {
    const selectedSymptom = symptoms.find(
      (symptom) => symptom.value === selectedDoenca
    )
    const selectedSpecialty = specialities.find(
      (specialty) => specialty.value === selectedEspecialidade
    )
    const selectedHealthInsurance = healthInsurances.find(
      (healthInsurance) => healthInsurance.value === selectedConvenio
    )
    const selectedAtendimentoValue =
      selectedAtendimento === 'online'
        ? 'Online'
        : selectedAtendimento === 'inPerson'
        ? 'Presencial'
        : ''
    const params: Record<string, any> = {
      name: searchQuery,
      symptoms: selectedSymptom ? selectedSymptom.label : '',
      specialities: selectedSpecialty ? selectedSpecialty.label : '',
      type: selectedAtendimentoValue,
      healthInsurance: selectedHealthInsurance
        ? selectedHealthInsurance.label
        : '',
      minPrice,
      maxPrice,
    }

    try {
      const response = await axios.get(url, { params })
      response.data
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error)
    }
  }

  const handleFilterClick = () => {
    const urls = ['http://localhost:3000/professional']

    Promise.all(urls.map((url) => fetchDataApi(url))).catch((error) => {
      console.error('Erro ao buscar dados da API:', error)
    })
  }

  return (
    <div>
      <div className="flex flex-col w-full md:max-w-[320px]">
        <label
          htmlFor="searchInput"
          className="flex md:text-base-1 text-[#395785] text-base-2 font-xs lg:font-normal lg:text-lg pb-2 md:pb-4"
        >
          Pesquise por nome
        </label>
        <div className="flex items-center w-full h-[48px] gap-1 rounded-[8px] border-zinc-300 border-[1px] bg-white">
          <img
            alt="Icon Search"
            src="https://storage.googleapis.com/efetiva-files/2023/02/8de1c744-icon-search.svg"
            width="16"
            height="16"
            decoding="async"
            data-nimg="1"
            className="border-zinc-300 ml-5"
            loading="lazy"
            style={{ color: 'transparent' }}
          />
          <input
            id="searchInput"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nome do especialista"
            className="flex items-center px-4 disabled:bg-gray-100 rounded-[8px] w-full h-full text-[#395785] !placeholder-zinc-500 font-normal text-base outline-none border-none"
          />
        </div>
        <div className="flex flex-col w-full">
          {/* Filtros */}
          <label className="flex md:text-base-1 text-[#395785] text-base-2 font-medium lg:font-normal lg:text-lg pb-2 md:pb-4 mt-5">
            Filtros
          </label>

          <select
            name="doencas"
            value={selectedDoenca}
            onChange={(e) => setSelectedDoenca(e.target.value)}
            className="select-control w-full h-[48px] px-4 py-2 border-zinc-300 border-[1px] bg-white rounded-[8px] !placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-gray-500"
          >
            <option value="" disabled>
              Doenças
            </option>
            {symptoms.map((symptom) => (
              <option key={symptom.value} value={symptom.value}>
                {symptom.label}
              </option>
            ))}
          </select>

          <select
            name="especialidades"
            value={selectedEspecialidade}
            onChange={(e) => setSelectedEspecialidade(e.target.value)}
            className="select-control w-full h-[48px] px-4 py-2 border-zinc-300 border-[1px] bg-white rounded-[8px] !placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-gray-500 mt-4"
          >
            <option value="" disabled>
              Especialidades
            </option>
            {specialities.map((specialty) => (
              <option key={specialty.value} value={specialty.value}>
                {specialty.label}
              </option>
            ))}
          </select>

          <select
            name="atendimento"
            value={selectedAtendimento}
            onChange={(e) => setSelectedAtendimento(e.target.value)}
            className="select-control w-full h-[48px] px-4 py-2 border-zinc-300 border-[1px] bg-white rounded-[8px] !placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-gray-500 mt-4"
          >
            <option value="" disabled>
              Atendimento
            </option>
            <option value="online">Online</option>
            <option value="inPerson">Presencial</option>
          </select>

          <select
            name="convenio"
            value={selectedConvenio}
            onChange={(e) => setSelectedConvenio(e.target.value)}
            className="select-control w-full h-[48px] px-4 py-2 border-zinc-300 border-[1px] bg-white rounded-[8px] !placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-gray-500 mt-4"
          >
            <option value="" disabled>
              Convênio
            </option>
            {healthInsurances.map((healthInsurance) => (
              <option key={healthInsurance.value} value={healthInsurance.value}>
                {healthInsurance.label}
              </option>
            ))}
          </select>

          <div>
            <label className="flex md:text-base-1 text-[#395785] text-base-2 font-medium lg:font-normal lg:text-lg pb-2 md:pb-4 pt-4">
              Preço
            </label>
            <div className="flex items-center gap-5">
              <div className="flex items-center w-full h-[48px] gap-1 rounded-[8px] border-zinc-300 border-[1px] bg-white">
                <input
                  name="min"
                  placeholder="Mínimo"
                  type="text"
                  value={minPrice ?? ''}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  className="flex items-center px-4 disabled:bg-gray-100 rounded-[8px] w-full h-full gap-1 text-[#395785] !placeholder-zinc-500 font-normal text-base outline-none"
                />
              </div>
              <div className="flex items-center w-full h-[48px] gap-1 rounded-[8px] border-zinc-300 border-[1px] bg-white">
                <input
                  name="max"
                  placeholder="Máximo"
                  type="text"
                  value={maxPrice ?? ''}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="flex items-center px-4 disabled:bg-gray-100 rounded-[8px] w-full h-full gap-1 text-[#395785] !placeholder-zinc-500 font-normal text-base outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Filtrar */}
      <button
        onClick={handleFilterClick}
        className="bg-green-600 text-white flex items-center justify-center w-full h-[56px] rounded-full text-md uppercase mt-8"
      >
        Filtrar
      </button>
    </div>
  )
}

export { SearchFilter }
