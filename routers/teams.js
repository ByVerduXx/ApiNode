const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);
const axios = require('axios').default;

const teamsController = require('../controllers/teams');
const { getUser } = require('../controllers/users');

router.route('/')
    .get( passport.authenticate('jwt', {session: false}), 
            (req, res) => {
                let user = getUser(req.user.userId);
                res.status(200).json({
                    trainer: user.userName,
                    team: teamsController.getTeamOfUser(req.user.userId)
                })
        })
    .put( passport.authenticate('jwt', {session: false}),
        (req, res) => {
        teamsController.setTeam(req.user.userId, req.body.team);
        res.status(200).send();
    })

router.route('/pokemons')
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
        let pokemonName = req.body.name;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => {
                let pokemon = {
                    name: pokemonName, 
                    pokedexNumber: response.data.id
                }
                teamsController.addPokemon(req.user.userId, pokemon);
                res.status(201).json(pokemon);
            })
            .catch(err => {
                res.status(500).json({message: err});
            })
    })

router.route('/pokemons/:pokeid')
    .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
        teamsController.deletePokemon(req.user.userId, req.params.pokeid);
        res.status(200).send();
    })

exports.router = router;
