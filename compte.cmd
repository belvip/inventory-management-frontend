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