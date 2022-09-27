import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";

const stripe = Stripe(process.env.STRIPE_SECRET);


export const createConnectAccount =  async (req, res) => {
   // console.log("REQ USER FROM REQUIRE_SIGNIN MIDDLEWARE", req.auth);
   // console.log("YOU HIT CREATE CONNECT ACCOUNT ENDPOINT");
   // 1. find user from db
   const user = await User.findById(req.auth._id).exec();
   console.log("USER ===>", user);
   // 2. If user don't have stripe_account_id yet, create now
    if(!user.stripe_acount_id) {
        const account = await stripe.accounts.create({
            type: "standard",
        });
        console.log("ACCOUNT ===>", account);
        user.stripe_acount_id = account.id;
        user.save();
    }
   // 3. create Login link based on account id (for frotend to complete onboarding process)
   let accountLink = await stripe.accountLinks.create({
       account: user.stripe_acount_id,
       refresh_url: process.env.STRIPE_REDIRECT_URL,
       return_url: process.env.STRIPE_REDIRECT_URL,
       type: 'account_onboarding',
   });

   // prefill any info such as email
   accountLink = Object.assign(accountLink,{
       "stripe_user[email]":user.email || undefined,
   });
   //console.log("ACCOUNT LINK", accountLink);
   let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
   console.log("LOGIN LINK",link);
   res.send(link);

   // 4. update payment schedule (optional default is 2 days)
};

const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                },
            },
        },
    })
}

export const getAccountStatus = async (req, res) => {
    // console.log("GET ACCOUNT STATUS");
    const user = await User.findById(req.auth._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_acount_id);
    // console.log("USER ACCOUNT RETRIEVE", account);
    const updateAccount = await updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        stripe_seller: account,
    },
    {new: true}).select("-password")
    .exec();
    // console.log(updatedUser);
    res.json(updatedUser);
};

export const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.auth._id).exec();
    try{
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_acount_id,
        }); 
        // console.log("BALANCE ===>", balance);
        res.json(balance);
    } catch (err) {
        console.log(err)
    }
};

export const payoutSetting = async (req, res) => {
    try{
        const user = await (await User.findById(req.user._id)).exec();

        const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller_id, {
            redirect_url: process.env.STRIPE_REDIRECT_URL,
        });
        console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
        res.json(loginLink);
    } catch (err) {
        console.log('STRIPE PAYOUT SETTING ERR', err);
    }
}