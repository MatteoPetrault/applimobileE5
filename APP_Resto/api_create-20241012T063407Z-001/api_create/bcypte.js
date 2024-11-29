const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connexion à la base de données
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'matteo',
});

// Fonction pour mettre à jour tous les mots de passe en clair avec des mots de passe hachés
const updatePasswords = () => {
    pool.query('SELECT * FROM app_utilisateurs WHERE mdp_util IS NOT NULL', (error, results) => {
        if (error) {
            console.error('Erreur de requête :', error);
            return;
        }

        results.forEach((user) => {
            bcrypt.hash(user.mdp_util, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Erreur lors du hachage du mot de passe pour l\'utilisateur', user.mail_util);
                    return;
                }

                // Mise à jour du mot de passe haché dans la base de données
                pool.query(
                    'UPDATE app_utilisateurs SET mdp_util = ? WHERE id_util = ?',
                    [hashedPassword, user.id_util], // Assurez-vous de remplacer "id_util" par l'ID de votre utilisateur
                    (updateErr) => {
                        if (updateErr) {
                            console.error('Erreur lors de la mise à jour du mot de passe pour l\'utilisateur', user.mail_util);
                        } else {
                            console.log(`Mot de passe de ${user.mail_util} mis à jour avec succès.`);
                        }
                    }
                );
            });
        });
    });
};

// Lancer la mise à jour des mots de passe
updatePasswords();
