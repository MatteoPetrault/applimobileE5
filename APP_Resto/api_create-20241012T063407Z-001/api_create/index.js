const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const bcrypt = require('bcrypt');  // Ajout de bcrypt
const app = express();
const port = 3001;

app.use(express.json());

// CORS configuration
app.use(cors()); // Autorise toutes les origines

// Connexion à la base de données
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'matteo',
  //port : 3306,
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ionicappresto@gmail.com',
    pass: 'ywah edth olvi fiwj'
  }
});
const sendConfirmationEmail = (email, eventLabel) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation d\'inscription',
    text: `Bonjour,\n\nJe vous confirme que vous êtes bien inscrit à l'événement "${eventLabel}".\n\nCordialement,`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
};
app.post('/api/desinscrire', (req, res) => {
  const { userId, eventId } = req.body;

  // Supprimer l'inscription de l'utilisateur dans la table app_inscrire
  const query = 'DELETE FROM app_inscrire WHERE id_util = ? AND id_event = ?';
  pool.query(query, [userId, eventId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la désinscription' });
    }

    if (result.affectedRows > 0) {
      // Récupérer l'email de l'utilisateur
      const userQuery = 'SELECT mail_util FROM app_utilisateurs WHERE id_util = ?';
      pool.query(userQuery, [userId], (err, userResult) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la récupération de l\'email de l\'utilisateur' });
        }

        const userEmail = userResult[0]?.mail_util;

        if (!userEmail) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Envoi de l'email de désinscription
        const eventLabel = `Événement ${eventId}`;  // Vous pouvez récupérer le libellé de l'événement si nécessaire
        sendUnsubscribeEmail(userEmail, eventLabel);

        // Réponse JSON avec un message de succès
        return res.status(200).json({ message: 'Désinscription réussie et email envoyé' });
      });
    } else {
      return res.status(404).json({ message: 'Inscription non trouvée' });
    }
  });
});

const sendUnsubscribeEmail = (email, eventLabel) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation de désinscription',
    text: `Bonjour,\n\nNous confirmons que vous vous êtes bien désinscrit de l'événement "${eventLabel}".\n\nCordialement,`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email de désinscription:', error);
    } else {
      console.log('Email de désinscription envoyé:', info.response);
    }
  });
};
// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérifier que l'email et le mot de passe sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
  }

  // Requête pour trouver l'utilisateur avec l'email donné
  pool.query('SELECT * FROM app_utilisateurs WHERE mail_util = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    // Si l'utilisateur n'est pas trouvé
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const user = results[0]; // Récupérer l'utilisateur trouvé dans la base de données

    // Gestion des statuts avant de vérifier le mot de passe
    if (user.id_statut === 1) {
      return res.status(403).json({
        message: "Votre demande n'a pas encore été traitée par les administrateurs."
      });
    }

    if (user.id_statut === 3) {
      return res.status(403).json({
        message: "Votre compte a été bloqué. Veuillez envoyer un mail au support si vous souhaitez le débloquer : test@test.fr"
      });
    }

    if (user.id_statut === 4) {
      return res.status(403).json({
        message: "Votre candidature a été rejetée. Si vous ne comprenez pas cette décision, merci d'envoyer un mail au support : test@test.fr"
      });
    }

    // Comparaison du mot de passe haché pour les utilisateurs autorisés (id_statut = 2)
    bcrypt.compare(password, user.mdp_util, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur lors de la comparaison du mot de passe.' });
      }

      if (isMatch) {
        // Si le mot de passe est correct, envoyer une réponse avec les informations de l'utilisateur
        return res.status(200).json({
          message: 'Connexion réussie',
          id: user.id_util,
          role: user.id_role,
          prenom: user.prenom_util,
          nom: user.nom_util
        });
      } else {
        // Si le mot de passe ne correspond pas
        return res.status(401).json({ message: 'Mot de passe ou utilisateur incorrect.' });
      }
    });
  });
});



app.get('/api/evenement_inscrit/:id', (req, res) => {
  const userId = req.params.id;

  pool.query(
    `SELECT label_event, date_event ,app_evenement.id_event
     FROM app_inscrire 
     INNER JOIN app_evenement ON app_inscrire.id_event = app_evenement.id_event 
     INNER JOIN app_utilisateurs ON app_inscrire.id_util = app_utilisateurs.id_util 
     WHERE app_inscrire.id_util = ?`,
    [userId],
    (error, results) => {
      if (error) {
        console.error(error); // Pour aider au débogage
        return res
          .status(500)
          .json({ message: "Erreur serveur lors de la récupération des événements." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Aucun événement trouvé pour cet utilisateur." });
      }

      // Retourner tous les événements
      const events = results.map(event => ({
        label: event.label_event,
        date: event.date_event,
        id: event.id_event
      }));

      return res.status(200).json(events);
    }
  );
});

// Route pour récupérer un événement spécifique par son ID
app.get('/api/evenement/:id', (req, res) => {
  const eventId = req.params.id;  // Récupérer l'ID de l'événement depuis l'URL

  pool.query('SELECT * FROM app_evenement WHERE id_event = ?', [eventId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'événement.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Événement non trouvé.' });
    }

    // Format des données pour l'événement
    const event = results[0]; // Seulement un événement puisque l'ID est unique
    return res.status(200).json({
      id: event.id_event,
      label: event.label_event,
      nbBenevoleRequis: event.nbBenevoleRequis,
      nbRepasPrevu: event.nb_repas_prevu,
      latitude: event.latitude_event,
      longitude: event.longitude_event,
      cp: event.cp_event,
      ville: event.ville_event,
      rue: event.rue_event,
      date: event.date_event || "Date non spécificiée",
      heureDebut: event.heure_debut_event,
      heureFin: event.heure_fin_event,
      commentaire: event.commentaire
    });
  });
});

app.get('/api/evenements', (req, res) => {
  pool.query('SELECT * FROM app_evenement', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur lors de la récupération des événements.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucun événement trouvé.' });
    }

    // Format des données pour chaque événement (incluant latitude, longitude et nom de l'événement)
    const events = results.map(event => ({
      id: event.id_event,
      label: event.label_event,
      nbBenevoleRequis: event.nbBenevoleRequis,
      nbRepasPrevu: event.nb_repas_prevu,
      latitude: event.latitude_event,
      longitude: event.longitude_event,
      cp: event.cp_event,
      ville: event.ville_event,
      rue: event.rue_event,
      date: event.date_event,
      heureDebut: event.heure_debut_event,
      heureFin: event.heure_fin_event,
      commentaire: event.commentaire
    }));

    return res.status(200).json(events);
  });
});
app.get('/api/nbbenevolemanquant', (req, res) => {
  pool.query(
    `SELECT 
      e.id_event,
      e.label_event,
      e.date_event,
      e.nbBenevoleRequis,
      COUNT(i.id_util) AS nbBenevoleInscrit,
      (e.nbBenevoleRequis - COUNT(i.id_util)) AS nbBenevoleManquant,
      e.latitude_event,
      e.longitude_event,
      DATEDIFF(e.date_event, CURDATE()) AS days_until_event
    FROM 
      app_evenement e
    LEFT JOIN 
      app_inscrire i ON e.id_event = i.id_event
    GROUP BY 
      e.id_event;`,
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur serveur lors de la récupération des événements.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Aucun événement trouvé.' });
      }

      const upcomingEvents = results.filter(event => event.days_until_event >= 0);

      const processedResults = upcomingEvents.map(event => {
        const daysUntilEvent = event.days_until_event;


        let color;
        if (event.nbBenevoleManquant <= 0) {
          color = 'green';
        } else if (daysUntilEvent > 30) {
          color = 'blue';
        } else if (daysUntilEvent <= 30 && daysUntilEvent > 14) {
          color = 'orange';
        } else if (daysUntilEvent <= 14) {
          color = 'red';
        }

        return {
          ...event,
          color,
        };
      });


      res.status(200).json(processedResults);
    }
  );
});
// Route pour vérifier si l'utilisateur est déjà inscrit
app.get('/api/check-inscription/:userId/:eventId', (req, res) => {
  const { userId, eventId } = req.params;

  pool.query('SELECT * FROM app_inscrire WHERE id_util = ? AND id_event = ?', [userId, eventId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      return res.status(200).json({ isRegistered: true });
    } else {
      return res.status(200).json({ isRegistered: false });
    }
  });
});

app.get('/api/inscription-attente', (req, res) => {
  // Requête SQL corrigée
  const query = `
    SELECT 
      app_utilisateurs.id_util AS id,
      app_utilisateurs.nom_util AS nom,
      app_utilisateurs.prenom_util AS prenom,
      app_utilisateurs.message_motiv_util AS messageMotivation,
      app_utilisateurs.date_cree_util AS dateCreation,
      app_role.label_role AS role
    FROM app_utilisateurs
    INNER JOIN app_role 
      ON app_utilisateurs.id_role = app_role.id_role
    WHERE app_utilisateurs.id_statut = 1
  `;

  // Exécuter la requête
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des inscriptions en attente :', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des inscriptions en attente.',
      });
    }

    // Formatage des résultats pour un retour clair
    const inscriptions = results.map(inscription => ({
      id_util: inscription.id,
      nom_util: inscription.nom,
      prenom_util: inscription.prenom,
      message_motiv_util: inscription.messageMotivation,
      date_cree_util: inscription.dateCreation,
      label_role: inscription.role,
    }));


    console.log('Inscriptions récupérées avec succès :', inscriptions);

    // Retourner les données au client
    return res.status(200).json({
      success: true,
      data: inscriptions,
    });
  });
});


app.post('/api/inscription-attente/refuser', (req, res) => {
  const { inscriptionId } = req.body;

  // Mettre à jour le statut de l'utilisateur
  const query = 'UPDATE `app_utilisateurs` SET `id_statut` = 3 WHERE `id_util` = ?';
  pool.query(query, [inscriptionId], (err, result) => {
    if (err) {
      console.error('Erreur SQL lors de la mise à jour du statut :', err);
      return res.status(500).json({ message: 'Erreur lors de la validation' });
    }

    if (result.affectedRows > 0) {
      // Récupérer l'email de l'utilisateur
      const userQuery = 'SELECT mail_util FROM app_utilisateurs WHERE id_util = ?';
      pool.query(userQuery, [inscriptionId], (err, userResult) => {
        if (err) {
          console.error('Erreur SQL lors de la récupération de l\'email :', err);
          return res.status(500).json({ message: 'Erreur lors de la récupération de l\'email de l\'utilisateur' });
        }

        const userEmail = userResult[0]?.mail_util;

        if (!userEmail) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Envoi de l'email de confirmation
        sendMailInscitRefuser(userEmail);

        return res.status(200).json({ message: 'Utilisateur refuser et email envoyé' });
      });
    } else {
      return res.status(404).json({ message: 'Inscription non trouvée' });
    }
  });
});
app.post('/api/inscription-attente/accepter', (req, res) => {
  const { inscriptionId } = req.body;

  // Mettre à jour le statut de l'utilisateur
  const query = 'UPDATE `app_utilisateurs` SET `id_statut` = 2 WHERE `id_util` = ?';
  pool.query(query, [inscriptionId], (err, result) => {
    if (err) {
      console.error('Erreur SQL lors de la mise à jour du statut :', err);
      return res.status(500).json({ message: 'Erreur lors de la validation' });
    }

    if (result.affectedRows > 0) {
      // Récupérer l'email de l'utilisateur
      const userQuery = 'SELECT mail_util FROM app_utilisateurs WHERE id_util = ?';
      pool.query(userQuery, [inscriptionId], (err, userResult) => {
        if (err) {
          console.error('Erreur SQL lors de la récupération de l\'email :', err);
          return res.status(500).json({ message: 'Erreur lors de la récupération de l\'email de l\'utilisateur' });
        }

        const userEmail = userResult[0]?.mail_util;

        if (!userEmail) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Envoi de l'email de confirmation
        sendMailInscitAccepter(userEmail);

        return res.status(200).json({ message: 'Acceptation réussie et email envoyé' });
      });
    } else {
      return res.status(404).json({ message: 'Inscription non trouvée' });
    }
  });
});
// Route POST pour modifier la date de dernière connexion
app.post('/api/modif/dateDerConnexion', (req, res) => {
  const { id_util } = req.body; // Récupère l'id_util depuis le corps de la requête

  // Vérification si id_util est fourni
  if (!id_util) {
    return res.status(400).json({ message: 'id_util est requis' });
  }

  // Requête SQL pour mettre à jour la date de dernière connexion de l'utilisateur
  const query = 'UPDATE `app_utilisateurs` SET `date_derniere_connexion` = NOW() WHERE `id_util` = ?';

  // Exécution de la requête SQL
  pool.query(query, [id_util], (err, result) => {
    if (err) {
      // En cas d'erreur SQL
      console.error('Erreur SQL lors de la mise à jour de la date de dernière connexion :', err);
      return res.status(500).json({ message: 'Erreur lors de la modification de la date' });
    }

    // Vérification si la requête a affecté une ligne
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Si la mise à jour est réussie, envoi d'une réponse de succès
    res.status(200).json({ message: 'Date de dernière connexion mise à jour avec succès' });
  });
});


// Fonction pour envoyer un email
const sendMailInscitAccepter = (email) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation de validation de votre inscription',
    text: `Bonjour,\n\nVotre inscription a été validée avec succès. Vous pouvez désormais accéder à votre compte.\n\nCordialement,\nL'équipe Menu'S du Cœur`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    } else {
      console.log('Email envoyé avec succès :', info.response);
    }
  });
};
const sendMailInscitRefuser = (email) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation de validation de votre inscription',
    text: `Bonjour,

Nous regrettons de vous informer que votre demande d'inscription n'a pas pu être acceptée. 

Cependant, vous avez la possibilité de renouveler votre demande si vous le souhaitez. Nous vous invitons à vérifier vos informations et à soumettre une nouvelle inscription via l'application Menu'S du Cœur.

Pour toute question ou assistance, n'hésitez pas à nous contacter.

Cordialement,  
L'équipe Menu'S du Cœur
`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    } else {
      console.log('Email envoyé avec succès :', info.response);
    }
  });
};

app.post('/api/inscrire', (req, res) => {
  const { userId, eventId } = req.body;

  // Requête pour récupérer le libellé de l'événement
  const query = 'SELECT label_event FROM app_evenement WHERE id_event = ?';
  pool.query(query, [eventId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de la base de données lors de la récupération de l\'événement' });
    }

    const eventLabel = result[0]?.label_event;

    if (!eventLabel) {
      return res.status(404).json({ message: 'Événement introuvable' });
    }

    // Récupérer l'email de l'utilisateur
    const userQuery = 'SELECT mail_util FROM app_utilisateurs WHERE id_util = ?';
    pool.query(userQuery, [userId], (err, userResult) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur de la base de données lors de la récupération de l\'utilisateur' });
      }

      const userEmail = userResult[0]?.mail_util;

      if (!userEmail) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }

      // Inscrire l'utilisateur à l'événement dans la table app_inscrire
      const insertQuery = 'INSERT INTO app_inscrire (id_util, id_event) VALUES (?, ?)';
      pool.query(insertQuery, [userId, eventId], (err, insertResult) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de l\'inscription à l\'événement' });
        }

        // Envoi de l'email de confirmation
        sendConfirmationEmail(userEmail, eventLabel);

        // Réponse JSON avec un message de succès
        return res.status(200).json({ message: 'Inscription réussie et email envoyé' });
      });
    });
  });
});
const emailInscriptionOrganisateur = (email) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation de demande d\'inscription',
    text: `Bonjour,\n\nVotre demande d'inscription en tant que Organisateur a bien été reçue. Elle sera traitée dans les plus brefs délais. Nous vous tiendrons informé dès que votre inscription aura été validée.\n\nCordialement,`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
};

app.post('/api/inscription-organisateur', (req, res) => {
  const {
    pseudo_util,
    mdp_util,
    nom_util,
    prenom_util,
    tel_util,
    cp_util,
    ville_util,
    rue_util,
    date_naissance,
    mail_util,
    message_motiv_util
  } = req.body;

  if (!mdp_util) {
    return res.status(400).json({ message: 'Le mot de passe est requis.' });
  }

  // l'ID du rôle (4 pour bénévole)
  const id_role = 3;
  const id_statut = 1; // En cours de validation
  const date_cree_util = new Date();
  const date_derniere_connexion = date_cree_util;
  const date_statuts = null;
  const comment = null;

  bcrypt.hash(mdp_util, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe:', err);
      return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe' });
    }

    console.log('Mot de passe haché:', hashedPassword); // Log pour vérifier le mot de passe haché

    // Requête SQL pour insérer le bénévole dans la base de données
    pool.query(
      'INSERT INTO app_utilisateurs (pseudo_util, mdp_util, nom_util, prenom_util, tel_util, cp_util, ville_util, rue_util, date_naissance, mail_util, message_motiv_util, date_derniere_connexion, date_cree_util, date_statuts, id_role, id_statut) VALUES (?, ?, ?,?,?, ?,?,?,?,?, ?,now(), now(), null, 3, 1)',
      [
        pseudo_util, hashedPassword, nom_util, prenom_util, tel_util, cp_util, ville_util, rue_util, date_naissance, mail_util, message_motiv_util, date_derniere_connexion, date_cree_util, date_statuts, id_role, id_statut, comment
      ],
      (error, results) => {
        if (error) {
          console.error('Erreur lors de l\'insertion dans la base de données:', error);
          return res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
        }

        emailInscriptionOrganisateur(mail_util);

        return res.status(201).json({ message: 'Inscription réussie pour le bénévole.', hashedPassword });
      }
    );
  });
});
const emailInscriptionBénévole = (email) => {
  const mailOptions = {
    from: 'ionicappresto@gmail.com',
    to: email,
    subject: 'Confirmation de demande d\'inscription',
    text: `Bonjour,\n\nVotre demande d'inscription en tant que Bénévole a bien été reçue. Elle sera traitée dans les plus brefs délais. Nous vous tiendrons informé dès que votre inscription aura été validée.\n\nCordialement,`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
};

app.post('/api/inscription-benevole', (req, res) => {
  const {
    pseudo_util,
    mdp_util,
    nom_util,
    prenom_util,
    tel_util,
    cp_util,
    ville_util,
    rue_util,
    date_naissance,
    mail_util,
    message_motiv_util
  } = req.body;

  if (!mdp_util) {
    return res.status(400).json({ message: 'Le mot de passe est requis.' });
  }

  // l'ID du rôle (4 pour bénévole)
  const id_role = 4;
  const id_statut = 1; // En cours de validation
  const date_cree_util = new Date();
  const date_derniere_connexion = date_cree_util;
  const date_statuts = null;
  const comment = null;

  bcrypt.hash(mdp_util, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe:', err);
      return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe' });
    }

    console.log('Mot de passe haché:', hashedPassword); // Log pour vérifier le mot de passe haché

    // Requête SQL pour insérer le bénévole dans la base de données
    pool.query(
      'INSERT INTO app_utilisateurs (pseudo_util, mdp_util, nom_util, prenom_util, tel_util, cp_util, ville_util, rue_util, date_naissance, mail_util, message_motiv_util, date_derniere_connexion, date_cree_util, date_statuts, id_role, id_statut) VALUES (?, ?, ?,?,?, ?,?,?,?,?, ?,now(), now(), null, 4, 1)',
      [
        pseudo_util, hashedPassword, nom_util, prenom_util, tel_util, cp_util, ville_util, rue_util, date_naissance, mail_util, message_motiv_util, date_derniere_connexion, date_cree_util, date_statuts, id_role, id_statut, comment
      ],
      (error, results) => {
        if (error) {
          console.error('Erreur lors de l\'insertion dans la base de données:', error);
          return res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
        }

        emailInscriptionBénévole(mail_util);

        return res.status(201).json({ message: 'Inscription réussie pour le bénévole.', hashedPassword });
      }
    );
  });
});
app.post('/api/ajout-event', (req, res) => {
  // Récupérer les données envoyées dans la requête
  const {
    label_event, nbBenevoleRequis, nb_repas_prevu, latitude_event, cp_event, ville_event, rue_event, date_event,
    heure_debut_event, heure_fin_event, commentaire, date_annulation, id_util, longitude_event,
  } = req.body;

  // Vérification des champs obligatoires
  if (
    !label_event ||
    !nb_repas_prevu ||
    !latitude_event ||
    !cp_event ||
    !ville_event ||
    !rue_event ||
    !date_event ||
    !heure_debut_event ||
    !heure_fin_event ||
    !id_util ||
    !longitude_event
  ) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs obligatoires doivent être remplis.',
    });
  }

  // Requête SQL pour insérer un nouvel événement
  const query = `
    INSERT INTO app_evenement (
      label_event,
      nbBenevoleRequis,
      nb_repas_prevu,
      latitude_event,
      cp_event,
      ville_event,
      rue_event,
      date_event,
      heure_debut_event,
      heure_fin_event,
      commentaire,
      date_annulation,
      id_util,
      longitude_event
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Exécuter la requête avec les valeurs des paramètres
  pool.query(
    query,
    [
      label_event,
      nbBenevoleRequis,
      nb_repas_prevu,
      latitude_event,
      cp_event,
      ville_event,
      rue_event,
      date_event,
      heure_debut_event,
      heure_fin_event,
      commentaire,
      date_annulation,
      id_util,
      longitude_event,
    ],
    (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'ajout de l\'événement :', error);
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de l\'ajout de l\'événement.',
        });
      }

      console.log('Événement ajouté avec succès :', results.insertId);
      return res.status(201).json({
        success: true,
        message: 'Événement ajouté avec succès.',
        eventId: results.insertId,
      });
    }
  );
});
// afficher les evenement que peut suppr les admins et superadmin
app.get('/api/evenements/suppression', (req, res) => {
  // Requête SQL corrigée
  const query = `
   SELECT id_event, label_event, CONCAT(rue_event, ", ", cp_event, " ", ville_event) AS adresse , date_event FROM app_evenement
  `;

  // Exécuter la requête
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des evenement:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des inscriptions en attente.',
      });
    }

    // Formatage des résultats pour un retour clair
    const events = results.map(event => ({
      id_event: event.id_event,
      label_event: event.label_event,
      adresse_event: event.adresse,
      date_event: event.date_event,
    }));

    // Retourner les données au client
    return res.status(200).json({
      success: true,
      data: events,
    });
  });
});

app.delete('/api/evenements/suppression/:id', (req, res) => {
  const eventId = req.params.id;

  const query = `DELETE FROM app_evenement WHERE id_event = ?`;

  pool.query(query, [eventId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'événement.',
      });
    }

    // Si la suppression réussit
    if (results.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: 'Événement supprimé avec succès.',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé.',
      });
    }
  });
});

// Mettre à jour un événement
app.put('/api/evenements/modifier/update/:id', (req, res) => {
  const id = req.params.id;
  const {
    label_event, nbBenevoleRequis, nb_repas_prevu, latitude_event, longitude_event,
    cp_event, ville_event, rue_event, date_event, heure_debut_event, heure_fin_event, commentaire
  } = req.body;
  console.log('Données reçues par l\'API:', req.body);  // Ajout du log
  console.log('ID de l\'événement à modifier:', id);
  const query = `
    UPDATE app_evenement
    SET label_event = ?, nbBenevoleRequis = ?, nb_repas_prevu = ?, latitude_event = ?, longitude_event = ?,
        cp_event = ?, ville_event = ?, rue_event = ?, date_event = ?, heure_debut_event = ?, heure_fin_event = ?, commentaire = ?
    WHERE id_event = ?
  `;

  pool.query(query, [
    label_event, nbBenevoleRequis, nb_repas_prevu, latitude_event, longitude_event,
    cp_event, ville_event, rue_event, date_event, heure_debut_event, heure_fin_event, commentaire, id
  ], (error, results) => {
    if (error) {
      console.error('Erreur lors de la mise à jour de l\'événement:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'événement.'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Événement mis à jour avec succès.'
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
