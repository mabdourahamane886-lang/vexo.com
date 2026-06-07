# vexo.com

Vexo est un MVP (Minimum Viable Product) d'application de productivité orientée tâches.

## Fonctionnalités actuelles

- Ajouter des tâches.
- Marquer une tâche comme terminée.
- Supprimer une tâche.
- Nettoyer toutes les tâches terminées.
- Persistance locale via `localStorage`.

## Lancer le projet

Comme il s'agit d'une application web statique sans dépendances, vous pouvez simplement ouvrir `index.html` dans un navigateur récent.

Option recommandée (serveur local) :

```bash
python3 -m http.server 8000
```

Puis ouvrir : `http://localhost:8000`.

## Arborescence

- `index.html` : structure de la page.
- `src/styles.css` : styles de l'interface.
- `src/vexo-app.js` : logique applicative (gestion des tâches).

## Roadmap suggérée

- Synchronisation cloud et comptes utilisateurs.
- Vue calendrier / planning.
- Mode hors ligne avancé.
- Application mobile native.
