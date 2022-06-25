const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config.json');
// const todolist = require('./todolist');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;


const options = {
    identityMetadata: `https://login.microsoftonline.com/${config.credentials.tenantName}.onmicrosoft.com/${config.metadata.version}/${config.metadata.discovery}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    policyName: config.policies.policyName,
    isB2C: config.settings.isB2C,
    validateIssuer: config.settings.validateIssuer,
    loggingLevel: config.settings.loggingLevel,
    passReqToCallback: config.settings.passReqToCallback,
    loggingNoPII: false,
    scope: ["demo.read"]
}

const bearerStrategy = new BearerStrategy(options, (token, done) => {
        // Send user info using the second argument
        done(null, { }, token);
    }
);

const app = express();

app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(bearerStrategy);

// To do list endpoints
// app.use('/api/todolist', todolist);

//enable CORS (for testing only -remove in production/deployment)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// exposed API endpoint

app.get('/authenticate',
    // passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('AccessToken: ', req.authInfo);

        // Service relies on the name claim.  
        res.status(200).json({
            'name': req.authInfo['name'],
            'email':req.authInfo['preferred_username'],
            'issued-by': req.authInfo['iss'],
            'issued-for': req.authInfo['aud'],
            'scope': req.authInfo['scp']
        });
    }
    // passport.authenticate('oauth-bearer', {session: false}),
    // (req, res) => {
    //     console.log('AccessToken: ', req.authInfo);
    
    //     //   res.send({'date': new Date() });
    //     // Service relies on the name claim.  
    //     res.status(200).json({'name': req.authInfo['name']});
    //     // res.status(200).json({'error': 'idk'});
    // }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;