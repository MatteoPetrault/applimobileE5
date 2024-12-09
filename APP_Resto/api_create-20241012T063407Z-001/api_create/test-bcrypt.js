const bcrypt = require('bcrypt');

const passwordToHash = 'superadmin';

// Hacher le mot de passe sans spécifier de sel
bcrypt.hash(passwordToHash, 10, (err, hash) => {
    if (err) {
        console.error('Erreur lors du hachage :', err);
    } else {
        console.log('Mot de passe haché :', hash);
    }
});
