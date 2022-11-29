import * as React from "react"
import { MoodMeasurer } from "./gastby-shared"

export const wrapRootElement = ({ element, props }) => {
    return <MoodMeasurer>{element}</MoodMeasurer>
  }