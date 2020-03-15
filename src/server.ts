import { App } from './app'

const express = new App()
const server = express.start()

export { express, server }
