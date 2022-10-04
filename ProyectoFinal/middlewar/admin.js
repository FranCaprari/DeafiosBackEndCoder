const middlewar = {};

middlewar.adminAuth = (permiso) =>{
    return (req, res, next) =>{
        permiso === true ? next() : res.status(404).json({
            error: `No tiene permiso para acceder`
        });
    };
};

module.exports = middlewar;