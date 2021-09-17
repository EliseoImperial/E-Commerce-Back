module.exports = (user) => {
  return (
    user.email.match(/([a-zA-Z0-9]{1})/i) !== null // Falta validar email correctamente.
    // Falta validar el resto de las cosas.
  );
};
