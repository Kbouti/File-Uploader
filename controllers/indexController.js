const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

async function main() {
    const users = await prisma.user.findMany();
//   const user = await prisma.user.create({
//     data: {
//       first_name: "Kevin",
//       last_name: "Boutilier",
//       email: "kevin.f.boutilier@gmail.com",
//       is_admin: true,
//     },
//   });
  console.log(`users: ${JSON.stringify(users)}`);
}



exports.getIndex = async (req, res) => {
  console.log(`getIndex controller function called`);
//   main()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

  res.render("./views/pages/home");
};


exports.logUsers = async (req, res) => {
    console.log(`logUsers controller function called`);


    const users = await prisma.user.findMany();
    console.log(`users: `);
    console.log(users);

    res.redirect("/");
}

exports.getSignUp = async (req, res) => {
    console.log(`getSignUp controller function called`);
    res.render("./views/pages/signUp");
}

exports.postSignUp = async (req, res) => {
    console.log(`postSignUp controller function called`);
    res.redirect("/");
}