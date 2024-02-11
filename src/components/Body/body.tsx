"use client"
import Image from "next/image"
import {
    CircleIcon,
    TriangleDownIcon,
    SunIcon,
    MoonIcon,
    Cross2Icon
} from "@radix-ui/react-icons"
import * as Dialog from "@radix-ui/react-dialog"
import style from "../main-content/index.module.css"
import navigationItems from "../nav-data/data"
import { useTheme } from "../contextApi/ThemeContext"
import { useEffect, useState } from "react"
import AllIssues from "../All-issues/AllIssues"
import Navigation from "../navigation/Navigation"
import Footer from "../footer/footer"

export default function Body(props) {
    interface Issue {
        id: number
        header: string
        company: { smallIcon: string; name: string }
        behaviour_text: string
        expected_behaviour_text: string
        labels: string[]
        labels2: {
            language: string
            number: number
            chat: {
                /*...*/
            }
            last_updated: string
            icon: string
        }[]
    }
    const [renderIssues, setRenderIssues] = useState<Issue[]>([])
    const [open, setOpen] = useState(false)
    const [selectedNavItem, setSelectedNavItem] = useState(null)
    const [searchFilter, setSearchFilter] = useState({
        language: "",
        organisation: "",
        type: "",
        recent: ""
    })
    const { isDarkMode, toggleDarkMode } = useTheme()

    const handleClick = (key: any) => {
        setOpen(!open)
        setSelectedNavItem(key)
    }

    // retrieve text of links clicked on popup modal
    const handleModalLinksClick = (item) => {
        const languages = ["Golang", "Javascript", "Typescript", "Rust"]
        const organisations = ["Galoy", "Chainlab", "Aremxy Plug", "Btrust"]
        const types = ["P2p", "Wallet", "Tools", "Education"]
        const recent = [
            "Newest",
            "Oldest",
            "Recently updated",
            "Last recently updated"
        ]

        setSearchFilter((prev) => ({
            ...prev,
            language: languages.includes(item.text) ? item.text : prev.language,
            organisation: organisations.includes(item.text)
                ? item.text
                : prev.organisation,
            type: types.includes(item.text) ? item.text : prev.type,
            recent: recent.includes(item.text) ? item.text : prev.recent
        }))
    }

    useEffect(() => {
        setRenderIssues(props.data)
    }, [])

    return (
        <>
         <Navigation userInfo={props.sessionInfo} data={props.issues} />
            <div className={`${style.container} mt-5 px-4 w-full py-4`}>
                <div className="lg:w-3/4">
                    <h1 className="text-2xl">Open Source Projects</h1>

                    <nav
                        className={`${style.small_nav} text-sm my-2 mt-4 flex justify-between items-center flex-wrap md:flex-nowrap`}
                    >
                        <div className="flex w-full flex-wrap mx-2">
                            <p className={`flex items-center`}>
                                <Image
                                    src="/filter.svg"
                                    alt="filter"
                                    width="20"
                                    height="50"
                                    color="#fff"
                                    className={`${
                                        isDarkMode
                                            ? style.icon_dark
                                            : style.icon_light
                                    }`}
                                />
                                Filter by:
                            </p>
                            {Object.entries(navigationItems).map(
                                ([key, { label, content }]) => (
                                    <span key={key} className={`flex flex-col`}>
                                        <a
                                            className="flex items-center px-4 relative cursor-pointer"
                                            onClick={() => handleClick(key)}
                                        >
                                            {label}
                                            <span>
                                                <TriangleDownIcon />
                                            </span>
                                            {selectedNavItem === key && (
                                                <Dialog.Root
                                                    open={open}
                                                    onOpenChange={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    <Dialog.Portal>
                                                        <Dialog.Overlay
                                                            className={`${
                                                                style.DialogOverlay
                                                            } ${
                                                                isDarkMode
                                                                    ? style.dialog_dark
                                                                    : style.dialog_light
                                                            }`}
                                                        />
                                                        <Dialog.Content
                                                            className={`${style.DialogContent}`}
                                                        >
                                                            <fieldset className="w-full mt-4">
                                                                <label
                                                                    htmlFor="search"
                                                                    aria-hidden
                                                                    hidden
                                                                ></label>
                                                                <input
                                                                    type="text"
                                                                    id="search"
                                                                    placeholder={
                                                                        key
                                                                    }
                                                                    className={`${style.modal_input}rounded-md px-4 py-2 w-full`}
                                                                />
                                                            </fieldset>
                                                            {content.map(
                                                                (el: any) => (
                                                                    <>
                                                                        <ul className="w-full">
                                                                            <li
                                                                                className={`${
                                                                                    isDarkMode
                                                                                        ? style.modal_links_dark
                                                                                        : style.modal_links_light
                                                                                } mt-2 flex items-center px-4 py-2`}
                                                                                onClick={() =>
                                                                                    handleModalLinksClick(
                                                                                        el
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    el.text
                                                                                }
                                                                                {el.image &&
                                                                                    el.image !==
                                                                                        "" && (
                                                                                        <span className="mx-2">
                                                                                            <Image
                                                                                                src={
                                                                                                    el.image
                                                                                                }
                                                                                                alt="language"
                                                                                                width={
                                                                                                    20
                                                                                                }
                                                                                                height={
                                                                                                    20
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                    )}
                                                                            </li>
                                                                        </ul>
                                                                    </>
                                                                )
                                                            )}
                                                            <Dialog.Close
                                                                asChild
                                                            >
                                                                <button
                                                                    className={`${style.IconButton}`}
                                                                    aria-label="Close"
                                                                >
                                                                    <Cross2Icon />
                                                                </button>
                                                            </Dialog.Close>
                                                        </Dialog.Content>
                                                    </Dialog.Portal>
                                                </Dialog.Root>
                                            )}
                                        </a>
                                    </span>
                                )
                            )}
                        </div>

                        <div className="md:mt-0 mt-4 mx-2">
                            <button
                                className={`${
                                    isDarkMode
                                        ? style.button_dark
                                        : style.button_light
                                } rounded-xl px-4 py-2 flex justify-between items-center w-full`}
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? "Dark mode" : "Light mode"}
                                <span className="mx-2">
                                    {isDarkMode ? (
                                        <MoonIcon color="#161616" />
                                    ) : (
                                        <SunIcon color="#FFA500" />
                                    )}
                                </span>
                            </button>
                        </div>
                    </nav>
                    <AllIssues
                        searchParams={searchFilter}
                        issues={props.data}
                        issueList={renderIssues}
                        setIssueList={setRenderIssues}
                    />
                </div>
            </div>
            <Footer
                issues={props.data}
                issueList={renderIssues}
                setIssueList={setRenderIssues}
            />
        </>
    )
}
