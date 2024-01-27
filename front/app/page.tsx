import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components/ModeToggle"

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {/* header */}
      <div className="flex w-full items-center justify-between border-b pb-2 dark:border-gray-800">
        <h2 className="text-lg font-bold">{siteConfig.name}</h2>
        <ModeToggle />
      </div>

      {/* video content */}
      <div className="flex size-full flex-col items-center justify-center">
        <video width="1400" height="768" controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  )
}
