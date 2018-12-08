module.exports = {
    'parser': 'babel-eslint',
    "env": {
        "jest": true,
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
