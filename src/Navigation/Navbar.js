import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Connect, Network } from '../utils/connectWallet.js'

const navigation = [
  { name: 'Leaderboard', href: '/' },
  { name: 'Submit your project', href: '/attestation' },
  { name: 'How it works', href: '/work' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [selectedNetwork, setSelectedNetwork] = useState('Optimism'); // Add state for selected network
  const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility

  const handleNetworkChange = async (event) => {
    console.log(event.target.value);
    setSelectedNetwork(event.target.value);
    await Network(event.target.value); // Call the Network function with the selected chainId
    setShowDropdown(false); // Hide the dropdown once the network is chosen
  };

  const handleNetworkButtonClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <Disclosure as="nav" className="bg-[#050401]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#303036] hover:text-[#fffaff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#fffaff]">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="text-[#fffaff] bg-[#fc5130]
                          rounded-md px-3 py-2 text-sm font-medium">
                    <h2>Optimism Impact Ranking (OIR)</h2>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          'text-gray-300 hover:bg-[#303036] hover:text-[#fffaff]',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <a className='text-gray-300 hover:bg-[#303036] hover:text-[#fffaff]
                          rounded-md px-3 py-2 text-sm font-medium' hreaf="#" onClick={Connect}>Connect wallet</a>
                    <button
                      className="text-gray-300 hover:bg-[#303036] hover:text-[#fffaff] rounded-md px-3 py-2 text-sm font-medium"
                      onClick={handleNetworkButtonClick}
                    >
                      Network
                    </button>
                    {showDropdown && (
                      <div className="relative">
                        <select
                          id="network"
                          className="bg-gray-900 text-gray-300 hover:bg-[#303036] hover:text-[#fffaff] rounded-md px-3 py-2 text-sm font-medium"
                          value={selectedNetwork}
                          onChange={handleNetworkChange}
                        >
                          <option value="Optimism">Optimism</option>
                          <option value="Base">Base</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-[#fffaff]' : 'text-gray-300 hover:bg-[#303036] hover:text-[#fffaff]',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
