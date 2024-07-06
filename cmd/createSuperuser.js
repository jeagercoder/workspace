const { Command } = require('commander');
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')

const program = new Command();
const prisma = new PrismaClient()
const PASSWORD_SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS)

program
  .name('Create Superuser')
  .description('CLI to create Superuser')
  .version('1.0.0');

program
  .requiredOption('-n, --name <string>', 'name')
  .requiredOption('-un --username <string>', 'username')
  .requiredOption('-e --email <string>', 'email')
  .requiredOption('-p --password <string>', 'password')
  .parse(process.argv)

const options = program.opts()

async function createSuperuser(data) {
  try {
    const hashPassword = await bcrypt.hash(data.password, PASSWORD_SALT_ROUNDS)
    data.password = hashPassword
    data['isSuperuser'] = true
    const user = await prisma.user.create({
      data: data
    })
    delete user.password
    console.log(user)
  } catch(err) {
    console.log('error', err)
  }
}

createSuperuser(options)