const router = require('express').Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

//----------------------------------------------------
router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please write a title'});
    }
    if(!description){
        errors.push({text: 'Please write a description'});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else {
        const newNote = new Note({ title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes');
    }
});
//modificación sacada de los comentarios del video--------------
router.get('/notes', isAuthenticated, async(req, res) => {
    await Note.find({user: req.user.id}).sort({date: 'desc'})
    .then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
                return {
                    _id: documento._id,
                    title: documento.title,
                    description: documento.description,
                    date: documento.date
                }
            })
        }
        res.render('notes/all-notes', { notes: contexto.notes})
    })
})

//-------------------------------------------------------
router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    try {  
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {
        note: note.toObject(),
        })
        }catch(err){
            console.log(err)
        }
})
//--------------------------------------------------------
router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description }= req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description})
    req.flash('success_msg', 'Note eddit')
    res.redirect('/notes')
})
//---------------------------------------------------------
router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note delete')
    res.redirect('/notes')
})

module.exports = router;