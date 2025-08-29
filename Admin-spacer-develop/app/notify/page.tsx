"use client"
import Image from "next/image";
// import Link from 'next/link'

import {
  Card,
  CardContent,
 
} from "@/components/ui/card";


import logo from "../assets/logo.svg";
import RightSide from "../main-components/RightSide";
import Link from "next/link";


export default function LoginPage() {
 

  return (
    <div className=" w-full relative min-h-screen grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-0 items-center  bg-[#F9F9F9]">
      <div className="absolute top-4 left-4 z-10">
        <Image
          src={logo}
          alt="Spacer Logo"
          width={90}
          height={24}
          className="h-8 w-auto"
        />
      </div>

      {/* Left Section - Content */}
      <RightSide />

      {/* Right Section - Login Form */}
      <div className="order-1 md:order-2 lg:order-2 w-full col-span-1 md:col-span-4 lg:col-span-5 flex items-center justify-center h-full bg-transparent py-28 md:py-0 px-4 md:px-0">
        <Card className=" w-full md:w-4/5 lg:w-2/5 min-w-[4rem] border border-[#E5E5E5] shadow-sm ">
          
          <CardContent>
          <Link
                href="/reset-password"
                
              >
            <div className="w-full flex flex-col space-y-2 justify-center items-center py-7">
            <svg width="100" height="99" viewBox="0 0 157 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_374_2795)">
                <path d="M26.8639 57.0018L114.128 34.9838C119.5 33.6285 124.915 36.8618 126.271 42.2334L135.783 79.9338C137.138 85.3054 133.905 90.7209 128.533 92.0762L41.2691 114.094C35.8975 115.45 30.4819 112.216 29.1266 106.845L19.6143 69.1443C18.259 63.7727 21.4923 58.3571 26.8639 57.0018Z" fill="#5105A9"/>
                <path d="M33.8791 27.0775L93.7558 11.9698C99.1274 10.6145 104.543 13.8478 105.898 19.2194L124.078 91.2734C125.434 96.645 122.2 102.061 116.829 103.416L56.9522 118.524C51.5806 119.879 46.1651 116.646 44.8098 111.274L26.6295 39.22C25.2742 33.8484 28.5075 28.4328 33.8791 27.0775Z" fill="#ECDCFF"/>
                <path d="M45.8374 50.6915C43.1585 51.3647 41.5329 54.0829 42.2117 56.7643C42.889 59.4424 45.6096 61.064 48.2866 60.3868L96.8822 48.1255C99.5574 47.449 101.179 44.7331 100.505 42.0572C99.8289 39.382 97.113 37.7605 94.4368 38.4342L45.8374 50.6915ZM62.2516 80.2514C59.574 80.9298 56.8534 79.3082 56.1789 76.6257C55.5045 73.9469 57.1301 71.2286 59.8079 70.5547L91.4997 62.5585C94.1756 61.8848 96.8915 63.5063 97.5679 66.1815C98.2418 68.8573 96.6203 71.5732 93.9449 72.2498L62.2516 80.2514Z" fill="white"/>
                <path d="M22.376 80.0898L37.4101 139.675C38.7654 145.046 44.181 148.28 49.5526 146.924L136.817 124.906C142.188 123.551 145.422 118.135 144.066 112.764L129.032 53.179L83.6436 102.188L22.376 80.0898Z" fill="#A459FB"/>
                </g>
                <defs>
                <clipPath id="clip0_374_2795">
                <rect width="128" height="128" fill="white" transform="translate(0.787415 31.3147) rotate(-14.1609)"/>
                </clipPath>
                </defs>
                </svg>

                <div className="flex flex-col gap-1 justify-center">
                    <h2 className="text-muted-foreground text-lg text-center font-semibold">Mail Sent</h2>
                    <p className="text-sm text-center text-[#4F5460]">A Reset password link has been sent to your email, click on it to reset your password</p>
                </div>

            </div>
            </Link>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
