import setup from './setup'

function run() {
  const args = process.argv.slice(2)

  switch ( args[0] ) {
    case 'setup':
      setup(args)
      break;

    default:
      // tslint:disable-next-line:no-console
      console.log(`Command ${args[0]} not found.`)
      break;
  }
}

run()
