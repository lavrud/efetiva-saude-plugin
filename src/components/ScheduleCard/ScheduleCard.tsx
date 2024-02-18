import { useState, useEffect } from 'react'
import axios from 'axios'

const bookedStyle = {
  border: '1px solid green',
  borderRadius: '5px',
  cursor: 'pointer',
}

interface Professional {
  id: string
  userId: number
  name: string
  image: string
  price: string
  duration: string
  time: string
}

function ScheduleCard() {
  const [professionalsData, setProfessionalData] = useState<Professional[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Professional[]>(
          'http://localhost:3000/schedules'
        )
        setProfessionalData(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    }
    setCurrentDate(today.toLocaleDateString('pt-BR', options))
  }, [])

  const handleBackToCalendar = () => {
    {window.location.href = '/'}
  }

  return (
    <div className="flex flex-col w-full bg-white shadow-medium md:shadow-lg rounded-[10px] p-5 mb-4 gap-4">
      <div className="w-full flex items-center mb-5">
        <div className="flex justify-start">
          <button onClick={handleBackToCalendar}>
            <img
              alt="Anterior"
              src="https://storage.googleapis.com/efetiva-files/2023/03/469e7915-icon-arrow-left.svg"
              width="30"
              height="30"
              decoding="async"
              data-nimg="1"
              className="w-[30px] h-[30px] md:w-[20px] md:h-[20px]"
              loading="lazy"
              style={{ color: 'transparent' }}
            />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="text-zinc-600 font-semibold capitalize text-base-2 md:text-base">
            {currentDate}
          </span>
        </div>
      </div>
      <div className="max-w-[420px] max-h-[300px] overflow-y-hidden">
        <div className="flex flex-wrap">
          {professionalsData.map((professional) => (
            <div
              key={professional.id}
              className="w-1/4 p-1 flex justify-center items-center"
            >
              <button
                style={bookedStyle}
                className="flex justify-center items-center relative w-full h-[38px] md:h-[30px] rounded-[5px] border-green-600 border-[1px] overflow-hidden transition font-medium text-base md:text-xs text-zinc-600"
              >
                <span>{professional.time}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ScheduleCard }
