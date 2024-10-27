
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

exports.getSignUp = async (req, res) => {
  console.log(`getSignUp controller function called`);
  res.render("./views/pages/signUp", { title: "Sign Up" });
};

exports.postSignUp = async (req, res) => {
  console.log(`postSignUp controller function called`);

  const prismaOperation = async () => {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        is_admin: false,
        Folders: {
            create: {
                name: req.body.username + "_main",
                base: true,
            }
        }
      },
    });

  };

  prismaOperation()
    .catch((e) => {
      console.error(e.message);
      console.log(`caught error`);
      //   Need to handle this error. This is getting triggered if we try to violate the unique constraint on username. This is a good thing. But the question is..... How do we report that back to the user
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  // 1. Need password encryption
  // 2. Need error handling if passwords don't match

  res.redirect("/");
};

exports.getLogIn = async (req, res) => {
  console.log(`getLogIn controller function called`);
  res.render("./views/pages/logIn", { title: "Log In" });
};





  

exports.postLogin = async (req, res, next) => {
    console.log(`postLogin controller function called`);

    // passport.authenticate('local', {failureRedirect: "/", title: "loginFailure"},
    //     function(req, res) {
    //         res.redirect("/", {title: "loginSuccess"})
    //     }
    // )


    // const middleware = passport.authenticate("local", {
    //     successRedirect: "/",
    //     failureRedirect: "/",
    //   });
    //   await middleware(req, res);
    //   next;


    // res.redirect("/");
    // res.render("./views/pages/home", {title: "Attempted login"});

}