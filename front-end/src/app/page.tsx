import Image from "next/image";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  BookOpenIcon,
  CakeIcon,
} from "@heroicons/react/20/solid";
import {
  BoltIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Header } from "@/components/header";
import { ContentWithBackground } from "@/components/content-with-background";

const primaryFeatures = [
  {
    name: "Create, Connect, and Publish with Ease",
    description:
      "Dive into a world where your words come alive, one chapter at a time. #B-hook is the groundbreaking platform for writers and creators seeking to revolutionize the way they engage with their audience.",
    href: "#",
    icon: BoltIcon,
  },
  {
    name: "Public Previews, Private Revelations",
    description:
      "Share your beginnings with the world and save the grand unveilings for your dedicated community. Whether they review, applaud, or support, your readers help shape your narrative journey.",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Transform Feedback into Masterpieces",
    description:
      "Each comment, each insight is an opportunity for growth. Harness the collective wisdom of your community to refine your work and explore new directions.",
    href: "#",
    icon: BookOpenIcon,
  },
  {
    name: "Innovative Publishing at Your Fingertips",
    description:
      "With #B-Hook, each chapter becomes a treasured NFT, opening doors to new possibilities in digital ownership and reader engagement. Begin your story with us today.",
    href: "#",
    icon: CakeIcon,
  },
];
const secondaryFeatures = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Simple queues.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.",
    icon: ArrowPathIcon,
  },
  {
    name: "Advanced security.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.",
    icon: FingerPrintIcon,
  },
  {
    name: "Powerful API.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: Cog6ToothIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ",
    icon: ServerIcon,
  },
];
const stats = [
  { id: 1, name: "Developers on the platform", value: "8,000+" },
  { id: 2, name: "Daily requests", value: "900m+" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Projects deployed", value: "12m" },
];
const footerNavigation = {
  solutions: [
    { name: "Hosting", href: "#" },
    { name: "Data Services", href: "#" },
    { name: "Uptime Monitoring", href: "#" },
    { name: "Enterprise Services", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "X",
      href: "https://twitter.com/FiftyWei",
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/fifty-wei/ethdam-2024",
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <ContentWithBackground>
        <section className="container mx-auto max-w-7xl px-6 pb-24 pt-10  lg:flex lg:px-8 gap-24 lg:pt-20">
          <div className="mx-auto max-w-2xl flex-shrink-1 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <Link
                href="https://github.com/fifty-wei/ethdam-2024"
                target="_blank"
                className="inline-flex space-x-6"
              >
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Github link
                </span>
              </Link>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Craft Your idea <br /> with your{" "}
              <span className="text-amber-400">B-Hook</span> community 🚀📚✨
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Publish, Engage, Innovate: Write and fund your books chapter by
              chapter on #B-Hook (or other creation). Share previews, gather
              feedback, and transform your words into exclusive NFTs for your
              community.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/create-book"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Create new book
              </Link>
              <Link
                href="/library"
                className="text-sm font-semibold leading-6 text-white"
              >
                View the library <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="mx-auto w-1/2 gap-8 flex-shrink-1 grid items-center grid-cols-2 mt-16 flex max-w-2xl sm:mt-24 lg:ml-0 lg:mt-0 lg:max-w-none lg:flex-none">
            <Link href="/book/13">
              <figure className="relative aspect-[2/3]">
                <Image
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=4212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  width={512}
                  height={1024}
                />
              </figure>
            </Link>
            <Link href="/book/7">
              <figure className="mt-32 relative aspect-[2/3]">
                <Image
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  src="https://images.unsplash.com/photo-1621827979802-6d778e161b28?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  width={512}
                  height={1024}
                />
              </figure>
            </Link>
          </div>
        </section>

        {/* Feature section */}
        <div id="features" className="mx-auto mt-32 max-w-7xl px-6  lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Create with ease
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your community, Your power
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Unique features make #B-Hook the ideal platform for creators of
              code, books, videos, or music. Engage with your community and
              craft the perfect masterpieces that resonate with your audience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {primaryFeatures.map(feature => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Logo cloud */}
        <div
          id="bounties"
          className="mx-auto mt-20 max-w-7xl px-6 sm:mt-16 lg:px-8"
        >
          <div className="mx-auto mt-40 max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Community & Privacy
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Proudly built with
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center  sm:max-w-xl sm:gap-x-10 lg:grid-cols-2">
            <Image
              className="h-24 w-auto text-white"
              src="/bandada.webp"
              alt="bandada"
              width={158}
              height={48}
            />
            <svg
              className="h-16 w-auto text-white"
              width="100%"
              height="100%"
              viewBox="0 0 121 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.1752 6.69508C36.3041 4.7864 34.0915 3.21926 31.6419 2.07863C31.5422 2.02797 31.4409 1.98058 31.3363 1.93646C30.8542 1.72075 30.3673 1.51648 29.8688 1.33509C28.4733 0.82851 27.014 0.45756 25.5057 0.236951C24.45 0.0833412 23.3731 0 22.2766 0C9.99278 0 0 9.99277 0 22.275C0 31.8445 6.06593 40.0218 14.5537 43.1691C15.5521 43.5384 16.5849 43.8391 17.6438 44.063C19.1391 44.38 20.6882 44.5516 22.275 44.5516C30.7366 44.5516 38.1098 39.8093 41.8798 32.843C43.5826 29.6973 44.5516 26.0972 44.5516 22.275C44.5516 16.214 42.1151 10.7134 38.1752 6.69344V6.69508ZM6.64442 34.1928C4.01182 30.7219 2.62116 26.5793 2.62116 22.2145C2.62116 14.7628 6.75227 8.25732 12.846 4.86974C13.0078 4.77986 13.1663 4.99394 13.0323 5.11977C12.475 5.64432 11.9407 6.20483 11.4308 6.8013C7.89944 10.9308 5.86493 16.5473 5.84696 22.2145C5.84696 29.5731 10.769 37.5134 18.7207 37.5134C25.8162 37.5134 31.5896 30.65 31.5896 22.2145C31.5896 18.2517 30.261 14.4442 27.9912 11.6204C27.9111 11.5207 28.0059 11.3802 28.1285 11.4161C31.9638 12.5502 34.8334 16.9624 34.8334 22.2145C34.8334 26.8522 33.1502 31.4703 30.2169 34.884C27.1758 38.4219 23.0921 40.3715 18.7207 40.3731C14.1173 40.3731 9.7117 38.1164 6.64442 34.1928ZM38.2602 10.2477C40.8895 13.7104 42.2785 17.8465 42.2736 22.2096C42.2736 29.6613 38.1425 36.1668 32.0488 39.5544C31.887 39.6443 31.7285 39.4302 31.8625 39.3044C32.4197 38.7798 32.9541 38.2193 33.464 37.6228C36.9953 33.4934 39.0298 27.8768 39.0478 22.2096C39.0478 14.8511 34.1258 6.91078 26.174 6.91078C19.0786 6.91078 13.3052 13.7742 13.3052 22.2096C13.3052 26.174 14.6337 29.98 16.9036 32.8054C16.9836 32.9051 16.8889 33.0456 16.7663 33.0097C12.931 31.8756 10.0614 27.465 10.0614 22.2145C10.0614 17.5768 11.7446 12.9604 14.6795 9.54829C17.7223 6.01037 21.806 4.06084 26.1789 4.06084C30.7791 4.06084 35.1831 6.31596 38.2618 10.2477H38.2602ZM29.2609 22.2145C29.2609 27.4683 26.7084 32.0047 23.0496 34.0408C22.5969 34.2925 22.038 34.2614 21.6181 33.9558L20.8353 33.3855C17.6259 31.0438 15.6338 26.7623 15.6338 22.2113C15.6338 16.9575 18.1864 12.4227 21.8452 10.3866C22.2995 10.1349 22.8567 10.166 23.2767 10.4716L24.0595 11.0419C27.2689 13.3836 29.2626 17.6651 29.2626 22.2162L29.2609 22.2145Z"
                fill="currentColor"
              ></path>
              <path
                d="M63.0324 15.5292C62.0372 14.8935 60.8753 14.5749 59.5451 14.5749C58.2149 14.5749 57.0482 14.8935 56.0481 15.5292C55.0463 16.1649 54.2718 17.0751 53.7243 18.2599C53.1769 19.4446 52.9023 20.8549 52.9023 22.4923C52.9023 24.1297 53.1769 25.5187 53.7243 26.7019C54.2734 27.8866 55.048 28.8001 56.0481 29.4423C57.0498 30.0862 58.2149 30.4065 59.5451 30.4065C60.8753 30.4065 62.0372 30.0845 63.0324 29.4423C64.0259 28.7985 64.8005 27.885 65.3561 26.7019C65.9117 25.5171 66.1895 24.115 66.1895 22.4923C66.1895 20.8696 65.9117 19.4267 65.3561 18.2501C64.8005 17.0735 64.0259 16.1665 63.0324 15.5309V15.5292ZM62.4523 25.3422C62.1679 26.1315 61.7725 26.7345 61.2675 27.1512C60.7626 27.5679 60.189 27.7755 59.5468 27.7755C58.9045 27.7755 58.3261 27.5679 57.8146 27.1512C57.3031 26.7345 56.9044 26.1315 56.62 25.3422C56.334 24.553 56.1919 23.6019 56.1919 22.4923C56.1919 21.3827 56.334 20.4317 56.62 19.6424C56.9044 18.8531 57.3031 18.2501 57.8146 17.8334C58.3261 17.4167 58.9029 17.2091 59.5468 17.2091C60.1906 17.2091 60.7642 17.4183 61.2675 17.8334C61.7725 18.2501 62.1663 18.8498 62.4523 19.6309C62.7382 20.4137 62.8804 21.3664 62.8804 22.4923C62.8804 23.6182 62.7382 24.553 62.4523 25.3422Z"
                fill="currentColor"
              ></path>
              <path
                d="M71.8745 15.3642L68.1159 29.2462C67.9934 29.6988 68.3349 30.1433 68.8023 30.1433H70.4805C70.8041 30.1433 71.0868 29.926 71.1685 29.6122L71.7437 27.429C71.8254 27.1169 72.1081 26.8979 72.4317 26.8979H76.2621C76.5873 26.8979 76.87 27.1169 76.9517 27.4323L77.5139 29.6106C77.5956 29.9244 77.8783 30.145 78.2035 30.145H79.9667C80.4357 30.145 80.7773 29.6988 80.6531 29.2462L76.8749 15.3642C76.79 15.0537 76.5089 14.8396 76.1886 14.8396H72.5624C72.2405 14.8396 71.9594 15.0553 71.8761 15.3658L71.8745 15.3642ZM73.5004 24.267C73.0331 24.267 72.6932 23.8257 72.8125 23.3747L73.4432 20.9791L73.672 20.0247C73.8469 19.2975 74.8813 19.2975 75.0561 20.0247L75.2849 20.9791L75.9043 23.378C76.0203 23.829 75.6804 24.2686 75.2146 24.2686H73.5004V24.267Z"
                fill="currentColor"
              ></path>
              <path
                d="M97.8281 15.5505V16.7581C97.8281 17.152 98.1468 17.4706 98.5406 17.4706H99.6829C100.077 17.4706 100.395 17.7893 100.395 18.1831V26.8032C100.395 27.197 100.077 27.5157 99.6829 27.5157H98.5406C98.1468 27.5157 97.8281 27.8343 97.8281 28.2282V29.4358C97.8281 29.8296 98.1468 30.1483 98.5406 30.1483H105.429C105.822 30.1483 106.141 29.8296 106.141 29.4358V28.2282C106.141 27.8343 105.822 27.5157 105.429 27.5157H104.286C103.892 27.5157 103.574 27.197 103.574 26.8032V18.1831C103.574 17.7893 103.892 17.4706 104.286 17.4706H105.429C105.822 17.4706 106.141 17.152 106.141 16.7581V15.5505C106.141 15.1567 105.822 14.838 105.429 14.838H98.5406C98.1468 14.838 97.8281 15.1567 97.8281 15.5505Z"
                fill="currentColor"
              ></path>
              <path
                d="M120.553 23.6869C120.253 23.1247 119.858 22.6704 119.368 22.3273C118.878 21.9841 118.345 21.7128 117.766 21.5167C117.188 21.319 116.608 21.1507 116.023 21.0118C115.438 20.8729 114.902 20.7258 114.411 20.5738C113.921 20.4202 113.531 20.2192 113.238 19.9708C112.946 19.7224 112.8 19.394 112.8 18.9838C112.8 18.4135 113.016 17.9755 113.447 17.6683C113.879 17.3611 114.423 17.2075 115.081 17.2075C115.534 17.2075 115.962 17.2827 116.341 17.482C116.845 17.7468 117.188 18.152 117.379 18.4413C117.51 18.639 117.732 18.755 117.969 18.755H119.889C120.387 18.755 120.74 18.2533 120.557 17.7909C120.427 17.4624 120.262 17.1585 120.057 16.8774C119.516 16.1322 118.811 15.5619 117.941 15.1664C117.072 14.771 116.117 14.5749 115.08 14.5749C113.954 14.5749 112.975 14.7726 112.142 15.1664C111.308 15.5603 110.661 16.0979 110.202 16.7777C109.741 17.4575 109.511 18.2223 109.511 19.0688C109.511 19.9153 109.656 20.564 109.949 21.0967C110.241 21.6311 110.632 22.0576 111.122 22.3795C111.612 22.7015 112.148 22.9646 112.733 23.1688C113.318 23.3731 113.898 23.5496 114.477 23.695C115.055 23.8405 115.588 23.999 116.078 24.1657C116.568 24.334 116.959 24.5497 117.252 24.8128C117.544 25.0759 117.69 25.4272 117.69 25.8652C117.69 26.4649 117.467 26.9323 117.021 27.2689C116.575 27.6055 115.98 27.7739 115.233 27.7739C114.312 27.7739 113.611 27.5026 113.129 26.9633C112.928 26.7378 112.774 26.4649 112.66 26.1528C112.548 25.8456 112.263 25.638 111.936 25.638H110.208C109.735 25.638 109.396 26.0923 109.522 26.5482C109.636 26.9633 109.793 27.3506 109.993 27.7085C110.475 28.5713 111.163 29.2364 112.053 29.7038C112.946 30.1711 114.006 30.4048 115.233 30.4048C116.345 30.4048 117.335 30.2104 118.204 29.8247C119.074 29.4374 119.757 28.903 120.255 28.2249C120.752 27.5451 121 26.7525 121 25.8456C121 24.9386 120.85 24.249 120.551 23.6852L120.553 23.6869Z"
                fill="currentColor"
              ></path>
              <path
                d="M94.3191 23.6869C94.0201 23.1247 93.6246 22.6704 93.1344 22.3273C92.6441 21.9841 92.1114 21.7128 91.5329 21.5167C90.9544 21.319 90.3743 21.1507 89.7893 21.0118C89.2043 20.8729 88.6683 20.7258 88.178 20.5738C87.6878 20.4202 87.2972 20.2192 87.0047 19.9708C86.7122 19.7224 86.5668 19.394 86.5668 18.9838C86.5668 18.4135 86.7825 17.9755 87.2139 17.6683C87.6453 17.3611 88.1895 17.2075 88.848 17.2075C89.3007 17.2075 89.7288 17.2827 90.1079 17.482C90.6113 17.7468 90.9544 18.152 91.1456 18.4413C91.2764 18.639 91.4986 18.755 91.7356 18.755H93.6557C94.1541 18.755 94.5071 18.2533 94.324 17.7909C94.1933 17.4624 94.0283 17.1585 93.824 16.8774C93.2831 16.1322 92.5771 15.5619 91.7078 15.1664C90.8384 14.771 89.8841 14.5749 88.8464 14.5749C87.7205 14.5749 86.7416 14.7726 85.9082 15.1664C85.0748 15.5603 84.4277 16.0979 83.9685 16.7777C83.5077 17.4575 83.2772 18.2223 83.2772 19.0688C83.2772 19.9153 83.4227 20.564 83.7152 21.0967C84.0077 21.6311 84.3983 22.0576 84.8885 22.3795C85.3787 22.7015 85.9147 22.9646 86.4998 23.1688C87.0848 23.3731 87.6649 23.5496 88.2434 23.695C88.8219 23.8405 89.3546 23.999 89.8449 24.1657C90.3351 24.334 90.7257 24.5497 91.0182 24.8128C91.3107 25.0759 91.4561 25.4272 91.4561 25.8652C91.4561 26.4649 91.2339 26.9323 90.7878 27.2689C90.3416 27.6055 89.7468 27.7739 89 27.7739C88.0783 27.7739 87.3773 27.5026 86.8952 26.9633C86.6942 26.7378 86.5406 26.4649 86.4262 26.1528C86.3118 25.8407 86.0291 25.638 85.7023 25.638H83.975C83.5011 25.638 83.1628 26.0923 83.2887 26.5482C83.4031 26.9633 83.5599 27.3506 83.7593 27.7085C84.2414 28.5713 84.9294 29.2364 85.82 29.7038C86.7122 30.1711 87.7728 30.4048 89 30.4048C90.1112 30.4048 91.1015 30.2104 91.9709 29.8247C92.8402 29.4374 93.5233 28.903 94.0217 28.2249C94.5185 27.5451 94.7669 26.7525 94.7669 25.8456C94.7669 24.9386 94.6165 24.249 94.3175 23.6852L94.3191 23.6869Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        {/* Feature section */}
        <div id="dashboard" className="mt-32 sm:mt-30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">
                Dashboard
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                One dashboard, many creations
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Manage your creations, engage with your community, and explore
                new possibilities with #B-Hook. Our platform is designed to help
                you create, connect, and publish with ease.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Image
                src="/dashboard.png"
                alt="App screenshot"
                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                width={2432}
                height={1442}
              />
              <div className="relative" aria-hidden="true">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-background pt-[11%]" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div
          id="contact"
          className="relative isolate mt-32 px-6 py-32   lg:px-8"
        >
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1d4240dd-898f-445f-932d-e2872fd12de3"
                width={200}
                height={200}
                x="50%"
                y={0}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
            />
          </svg>
          <div
            className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              You are interested in our project.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Please contact us at hello@fiftywei.co or visit our website below
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://www.fiftywei.co/"
                target="_blank"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                FiftyWei
              </a>
            </div>
          </div>
        </div>
      </ContentWithBackground>

      {/* Footer */}
      <footer aria-labelledby="footer-heading" className="relative pb-40">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8">
          <div className="border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
              &copy; 2024 FiftyWei, ETH Amsterdam
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
