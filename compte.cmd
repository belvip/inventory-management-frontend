# 🔐 États du Compte : Verrouillé vs Désactivé

## 🔒 Compte Verrouillé (`accountNonLocked: false`)

### 📋 Caractéristiques
- ✅ Compte actif (`enabled: true`)
- ❌ Temporairement bloqué pour des raisons de sécurité
- 🔄 Réversible facilement par un administrateur

### 🎯 Cas d'usage
- Trop de tentatives de connexion échouées
- Activité suspecte détectée
- Mesure de sécurité temporaire
- Violation de politique d'usage

### ⚡ Actions possibles
- L'admin peut déverrouiller instantanément
- Le compte peut être déverrouillé automatiquement après un délai
- L'utilisateur garde ses données et permissions

---

## ❌ Compte Désactivé (`enabled: false`)

### 📋 Caractéristiques
- ❌ Compte inactif complètement
- 🚫 Accès totalement bloqué
- ⚠️ Action administrative plus sérieuse

### 🎯 Cas d'usage
- Employé qui a quitté l'entreprise
- Violation grave des règles
- Compte suspendu pour enquête
- Demande de suppression de compte

### ⚡ Actions possibles
- Nécessite une réactivation par l'admin
- Peut nécessiter une validation supplémentaire
- Plus difficile à inverser qu'un verrouillage

---

## ❓ Question Réponse

### Dans quel cas l'utilisateur peut encore accéder à son compte ?

**🚫 Réponse courte :** Dans **AUCUN** des deux cas l'utilisateur ne peut accéder à son compte.

### 🔒 Compte Verrouillé
- ❌ Connexion refusée
- 🚪 L'utilisateur ne peut pas se connecter
- 💬 Message : "Compte temporairement verrouillé"

### ❌ Compte Désactivé
- ❌ Connexion refusée
- 🚪 L'utilisateur ne peut pas se connecter
- 💬 Message : "Compte désactivé"

---

## 📊 Résumé Visuel

| État | Badge | Couleur | Gravité | Réversibilité |
|------|-------|---------|----------|---------------|
| **Actif** | Actif | 🟢 Vert | Normale | - |
| **Verrouillé** | Verrouillé | 🟠 Orange | Modérée | Facile |
| **Désactivé** | Désactivé | 🔴 Rouge | Élevée | Difficile |

## 🔑 Tableau Comparatif Accès

| État | Accès utilisateur | Action requise |
|------|-------------------|----------------|
| **Verrouillé** | ❌ Bloqué | Admin déverrouille |
| **Désactivé** | ❌ Bloqué | Admin réactive |

---

## 💡 En Pratique
**Le verrouillage** est une mesure de sécurité **temporaire**, tandis que **la désactivation** est une action administrative **plus définitive**.

**Les deux empêchent complètement la connexion** - la différence est dans la facilité de résolution et la gravité de la situation, pas dans l'accès.

# 🔄 Compte Désactivé vs Identifiants Expirés

## 📊 Tableau Comparatif

| Aspect | Compte Désactivé | Identifiants Expirés |
|--------|------------------|---------------------|
| **Cause** | Action administrative | Expiration temporelle |
| **Résolution** | Admin réactive | Utilisateur change mot de passe |
| **Durée** | Indéfinie | Temporaire jusqu'au changement |
| **Gravité** | Sanction/départ | Maintenance sécurité |

## 🔍 Explications Détaillées

### ❌ Compte Désactivé
- **Cause** : Décision administrative délibérée
- **Statut** : Désactivation manuelle du compte
- **Conséquence** : Accès complètement bloqué
- **Contextes** :
  - Départ d'un employé
  - Sanction disciplinaire
  - Suspension administrative

### ⏰ Identifiants Expirés
- **Cause** : Politique de sécurité temporelle
- **Statut** : Expiration automatique programmée
- **Conséquence** : Accès limité nécessitant une mise à jour
- **Contextes** :
  - Rotation régulière des mots de passe
  - Politique de sécurité proactive
  - Maintenance préventive

## 🛠️ Processus de Résolution

### Compte Désactivé
1. **Identification** de la raison de la désactivation
2. **Intervention** administrative requise
3. **Réactivation** manuelle par un administrateur
4. **Vérification** des autorisations

### Identifiants Expirés
1. **Notification** à l'utilisateur
2. **Redirection** vers le portail de changement
3. **Changement** autonome du mot de passe
4. **Reprise** automatique de l'accès

## ⚠️ Impact Utilisateur

| Situation | Accès | Message Typique | Action Utilisateur |
|-----------|--------|-----------------|-------------------|
| **Compte Désactivé** | ❌ Bloqué | "Votre compte a été désactivé" | Contacter l'admin |
| **Identifiants Expirés** | ⚠️ Limité | "Votre mot de passe a expiré" | Changer le mot de passe |