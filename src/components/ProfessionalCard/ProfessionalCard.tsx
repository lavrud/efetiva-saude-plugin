import { useState, useEffect } from 'react'
import axios from 'axios'
import { CalendarCard } from '../CalendarCard/CalendarCard'

function ProfessionalCard() {
  const [professionals, setProfessional] = useState<any>([])

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/professional`
        )
        setProfessional(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados do profissional:', error)
      }
    }

    fetchProfessional()
  }, [])

  return (
    <div className="cards">
      {professionals.map((professional: any) => (
        <div key={professional.id}>
          <div className="flex flex-col mt-10 gap-3">
            <div className="flex md:flex-row flex-col bg-white shadow-medium md:shadow-lg rounded-[10px] p-5 mb-4 gap-4">
              <div className="flex flex-col w-full">
                <div className="flex flex-1">
                  {/*  FOTO  */}
                  <a
                    href={`https://app.efetivasaude.com/perfil?id=${professional.id}`}
                    target="_blank"
                    className="w-[119px] h-[119px]"
                  >
                    <img
                      alt="Foto do especialista"
                      width="85"
                      height="119"
                      decoding="async"
                      data-nimg="1"
                      src={professional.image}
                      className="rounded-[10px] !object-cover !w-[119px] !h-[119px]"
                      loading="lazy"
                      style={{ color: 'transparent' }}
                    />
                  </a>

                  {/*  NOME  */}
                  <div className="flex flex-1 flex-col pl-3 md:pl-5 pr-1">
                    <a
                      target="_blank"
                      href="https://app.efetivasaude.com/perfil?id=8132"
                      className="text-[#395785] text-base-2 md:text-lg font-medium md:font-semibold line-clamp-1"
                    >
                      {professional.name}
                    </a>
                    <div className="flex items-center">
                      {/*  PROFISSÃO  */}
                      <p className="text-base md:text-lg text-[#395785]">
                        {professional.profession}
                      </p>
                      <span>,&nbsp;</span>
                      {/*  LINK PERFIL  */}
                      <a
                        target="_blank"
                        href={`https://app.efetivasaude.com/perfil?id=${professional.id}`}
                        className="appearance-none outline-none text-[#1757E9] text-base md:text-lg underline"
                      >
                        Mais
                      </a>
                    </div>
                    <div className="hidden md:flex flex-1 items-end">
                      <div className="flex flex-1 items-center">
                        {/*  SCORE  */}
                        <div className="w-[26px] h-[26px] rounded-md flex items-center justify-center bg-[#395785] text-white font-medium mr-1">
                          {professional.generalScore}
                        </div>
                        {/* STARS */}
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index <
                              professional.serviceScore.noteGeneralService
                                ? 'text-green-600'
                                : 'text-gray-400'
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                          </svg>
                        ))}
                        {/*  OPINIONS  */}
                        <span className="text-base text-[#7B7B7B]">
                          &nbsp; {professional.serviceScore.qtd} opiniões
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-5"></div>

                <div className="hidden md:flex flex-col flex-1 gap-3 mt-4">
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 36.692 53"
                    >
                      <path
                        id="Icon_ionic-ios-pin"
                        data-name="Icon ionic-ios-pin"
                        d="M26.221,3.375c-10.129,0-18.346,7.631-18.346,17.034,0,13.25,18.346,35.966,18.346,35.966S44.567,33.659,44.567,20.409C44.567,11.006,36.35,3.375,26.221,3.375Zm0,24.321A5.975,5.975,0,1,1,32.2,21.721,5.976,5.976,0,0,1,26.221,27.7Z"
                        transform="translate(-7.875 -3.375)"
                        fill="#395785"
                      ></path>
                    </svg>

                    <p className="text-sm text-[#395785] font-normal">
                      {professional.address}
                    </p>
                  </div>

                  {/*  PLANS  */}
                  <div className="flex gap-2 items-center">
                    {professional.acceptPlan ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="13"
                        viewBox="0 0 18.623 13.036"
                      >
                        <path
                          id="Icon_awesome-user-friends"
                          data-name="Icon awesome-user-friends"
                          d="M5.587,8.768A3.259,3.259,0,1,0,2.328,5.509,3.257,3.257,0,0,0,5.587,8.768ZM7.822,9.7H7.58a4.5,4.5,0,0,1-3.987,0H3.352A3.353,3.353,0,0,0,0,13.051v.838a1.4,1.4,0,0,0,1.4,1.4h8.38a1.4,1.4,0,0,0,1.4-1.4v-.838A3.353,3.353,0,0,0,7.822,9.7Zm6.146-.931a2.793,2.793,0,1,0-2.793-2.793A2.794,2.794,0,0,0,13.967,8.768Zm1.4.931h-.111a3.669,3.669,0,0,1-2.572,0h-.111a3.232,3.232,0,0,0-1.621.448,4.258,4.258,0,0,1,1.155,2.9v1.117c0,.064-.015.125-.017.186h5.139a1.4,1.4,0,0,0,1.4-1.4A3.257,3.257,0,0,0,15.364,9.7Z"
                          transform="translate(0 -2.25)"
                          fill="#395785"
                        ></path>
                      </svg>
                    ) : null}

                    <p className="text-sm text-[#395785] font-normal">
                      {professional.acceptPlan ? 'Pacientes fiéis' : ''}
                    </p>
                  </div>

                  {/*  PATIENTS  */}
                  <div className="flex gap-2 items-center">
                    {professional.faithfulPatients ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="15"
                        viewBox="0 0 14.516 15.482"
                      >
                        <path
                          id="Icon_awesome-shield-alt"
                          data-name="Icon awesome-shield-alt"
                          d="M14.749,2.532,8.942.113a1.456,1.456,0,0,0-1.116,0L2.02,2.532a1.45,1.45,0,0,0-.9,1.34c0,6,3.463,10.152,6.7,11.5a1.456,1.456,0,0,0,1.116,0c2.592-1.08,6.7-4.808,6.7-11.5A1.452,1.452,0,0,0,14.749,2.532ZM8.386,13.5l0-11.522L13.7,4.192C13.6,8.771,11.22,12.088,8.386,13.5Z"
                          transform="translate(-1.125 -0.002)"
                          fill="#395785"
                        ></path>
                      </svg>
                    ) : null}

                    <p className="text-sm text-[#395785] font-normal">
                      {professional.faithfulPatients ? 'Aceita convênio' : ''}
                    </p>
                  </div>
                </div>

                {/*  TYPE  */}
                <div className="hidden md:flex flex-1 items-end">
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex flex-col items-end">
                      <div className="flex gap-6 justify-between items-end">
                        {/*  ONLINE  */}
                        <div className="inline-flex items-center">
                          <input
                            type="radio"
                            className="w-[14px] h-[14px] appearance-none rounded-xl border-green-600 border-[5px]"
                            name="type"
                          />
                          <label
                            className="ml-2 text-sm md:text-base font-medium hover:cursor-pointer text-[#395785]"
                            htmlFor="online"
                          >
                            Online
                          </label>
                        </div>
                        {/*  PRESENCIAL  */}
                        <div className="inline-flex items-center">
                          <input
                            type="radio"
                            className="w-[14px] h-[14px] appearance-none rounded-xl border-zinc-400 border-2"
                            name="type"
                          />
                          <label
                            className="ml-2 text-sm md:text-base font-medium hover:cursor-pointer text-zinc-400"
                            htmlFor="inPerson"
                          >
                            Presencial
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 max-w-[211px]">
                      {/*  AGENDAR CONSULTA  */}
                      <button
                        color="DEFAULT"
                        disabled
                        className="bg-[#395785] text-blue-100 flex items-center justify-center w-full md:px-3 h-[48px] rounded-full text-base gap-2 opacity-50 text-2xs uppercase font-normal"
                      >
                        <img
                          alt="Agendar"
                          src="https://storage.googleapis.com/efetiva-files/2023/03/b8941bb2-icon-calendar-plus.svg"
                          width="14"
                          height="16"
                          decoding="async"
                          data-nimg="1"
                          loading="lazy"
                          style={{ color: 'transparent' }}
                        />
                        Agendar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-1 border-l-[1px] border-[#395785]" />
              <CalendarCard />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { ProfessionalCard }
