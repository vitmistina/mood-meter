import * as React from "react"

import { Script } from "gatsby"

export const MoodMeasurer: React.FC<React.PropsWithChildren> = ({children})=> {
    return (
        <>
            {children}
            <Script src="http://localhost:8080/index.js" />
        </>
    )
}