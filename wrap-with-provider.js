import React from "react"
import { Provider } from "react-redux"

import Store from "./src/redux/store"

const store = Store();

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={store}>{element}</Provider>