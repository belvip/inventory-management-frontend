# 🔐 États du Compte : Verrouillé vs Désactivé

## ❓ Question
Dans quel cas parmi les deux l'utilisateur peut encore accéder à son compte ?

## 🚫 Réponse Courte
**AUCUN des deux** - Dans les deux situations, l'utilisateur ne peut pas accéder à son compte.

---

## 🔒 Compte Verrouillé (`accountNonLocked: false`)

### Caractéristiques :
- ✅ Compte actif (`enabled: true`)
- ❌ **Temporairement bloqué** pour des raisons de sécurité
- 🔄 Réversible facilement par un administrateur

### ❌ Accès Utilisateur :
- **Connexion refusée**
- 🚪 L'utilisateur ne peut pas se connecter
- 💬 Message : *"Compte temporairement verrouillé"*

### Cas d'usage :
- Trop de tentatives de connexion échouées
- Activité suspecte détectée
- Mesure de sécurité temporaire
- Violation de politique d'usage

---

## ❌ Compte Désactivé (`enabled: false`)

### Caractéristiques :
- ❌ Compte inactif complètement
- 🚫 **Accès totalement bloqué**
- ⚠️ Action administrative plus sérieuse

### ❌ Accès Utilisateur :
- **Connexion refusée**
- 🚪 L'utilisateur ne peut pas se connecter
- 💬 Message : *"Compte désactivé"*

### Cas d'usage :
- Employé qui a quitté l'entreprise
- Violation grave des règles
- Compte suspendu pour enquête
- Demande de suppression de compte

---

## 📊 Tableau Comparatif

| État | Badge | Couleur | Gravité | Réversibilité | Accès Utilisateur |
|------|-------|---------|----------|---------------|-------------------|
| **Actif** | Actif | 🟢 Vert | Normale | - | ✅ Accès complet |
| **Verrouillé** | Verrouillé | 🟠 Orange | Modérée | Facile | ❌ **Bloqué** |
| **Désactivé** | Désactivé | 🔴 Rouge | Élevée | Difficile | ❌ **Bloqué** |

---

## 🔑 Actions Requises

| État | Accès Utilisateur | Action Requise |
|------|-------------------|----------------|
| **Verrouillé** | ❌ **Bloqué** | Admin déverrouille |
| **Désactivé** | ❌ **Bloqué** | Admin réactive |

---

## 💡 En Pratique
- **Le verrouillage** est une mesure de sécurité **temporaire**
- **La désactivation** est une action administrative **plus définitive**
- **Les deux empêchent complètement la connexion** - la différence réside dans la facilité de résolution et la gravité de la situation, pas dans l'accès.