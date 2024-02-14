export interface SessionInfo {
    user: {
        name: string | null | undefined
        email: string | null | undefined
        image: string | null | undefined
    }
}

export interface MainProps {
    userInfo: SessionInfo | null
}

export interface IssueDetails {
    language: string
    number: number
    chat: {
        chat_number: number
        chat_icons: string
    }
    last_updated: string
    icon: string
}

export interface Data {
    id: number
    header: string
    company: { smallIcon: string; name: string }
    behaviour_text: string
    expected_behaviour_text: string
    labels: Array<string>
    issue_details: IssueDetails[]
}

export interface Issue {
    id: number
    header: string
    company: { smallIcon: string; name: string }
    behaviour_text: string
    expected_behaviour_text: string
    labels: string[]
    issue_details: {
        language: string
        number: number
        chat: {
            chat_number: number
            chat_icons: string
        }
        last_updated: string
        icon: string
    }[]
}
