
let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
};

module.exports = {
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio - Insecto!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo electrónico es obligatorio - Insecto!"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria - Insecto!"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    default: "USER_ROLE",
    enum: rolesValidos,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
}