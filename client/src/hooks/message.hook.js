import { useCallback } from "react"


export const useMesasge = () => {
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}