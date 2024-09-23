"use server";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems, // Note: Updated from MenuItem to MenuItems
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageButton from "../LanguageButton";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../public/logo.png";

export default function NavigationBar() {
  const { t, i18n } = useTranslation();
  const navigation = [
    { name: t("navigation.statistics"), href: "statistiky" },
    { name: t("navigation.aboutProject"), href: "oprojekte" },
    { name: t("navigation.contact"), href: "kontakt" },
    { name: t("navigation.supportUs"), href: "podportenas" },
  ];
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      ?.map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  return (
    <Disclosure as="nav" className="bg-[#F6F6F6] text-[#297A49] shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center fle sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 md:justify-between items-center justify-center sm:items-stretch">
            <div className="flex flex-shrink-0 items-center">
              <img alt="PalivoSlovensko" src={logo} className="h-8 w-auto" />
              <h1 className="font-bold text-lg">Palivoslovensko.sk</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block justify-end md:justify-end">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className="px-3 py-2 font-medium text-lg"
                  >
                    {item.name}
                  </NavLink>
                ))}
                <Menu as="div" className="px-3 py-2 font-medium text-lg">
                  <MenuButton className="flex ">
                    <span className="flex px-2">
                      {t("navigation.language")}
                    </span>
                    <span className="flex" id="flag-emoji">
                      {getFlagEmoji(i18n.language)}
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                          <LanguageButton
                            code="sk"
                            language="Slovensky"
                            i18n={i18n}
                          />
                        </span>
                      </MenuItem>
                      <MenuItem>
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                          <LanguageButton
                            code="en"
                            language="English"
                            i18n={i18n}
                          />
                        </span>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}

          <Menu
            as="div"
            className="block rounded-md px-3 py-2 text-base font-medium"
          >
            <MenuButton className="flex ">
              <span className="flex">{t("navigation.language")}</span>
              <span className="flex px-2" id="flag-emoji">
                {getFlagEmoji(i18n.language)}
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <span className="block py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                    <LanguageButton
                      code="sk"
                      language="Slovensky"
                      i18n={i18n}
                    />
                  </span>
                </MenuItem>
                <MenuItem>
                  <span className="block py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                    <LanguageButton code="en" language="English" i18n={i18n} />
                  </span>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
