import { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ScheduleCard } from '../ScheduleCard/ScheduleCard'

interface Professional {
  id: string
  userId: number
  name: string
  image: string
  price: string
  duration: string
  currentOfficeHour: {
    date: string
    actived: boolean
    schedules: any[]
  }[]
}

function CalendarCard() {
  const [professionalsData, setProfessionalData] = useState<Professional[]>([])
  const [selectedDay, setSelectedDay] = useState<Date>()

  // const bookedStyle = {
  //   border: '1px solid green',
  //   borderRadius: '10px',
  //   cursor: 'pointer',
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Professional[]>(
          'http://localhost:3000/professional'
        )
        setProfessionalData(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchData()
  }, [])



  return (
    <div className="mt-5 md:mt-0 md:min">
      {professionalsData.length > 0 ? (
        !selectedDay ? (
          <Calendar
            mode="single"
            locale={ptBR}
            onSelect={setSelectedDay}
            className="bg-white relative rounded-[10px] shadow-lg sm:p-6"
          />
        ) : (
          <ScheduleCard />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export { CalendarCard }
