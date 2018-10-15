import React from "react"
import mainStyles from "./layout.css"

export default ({ children }) => (
    <div className={mainStyles.container}>{children}</div>
)