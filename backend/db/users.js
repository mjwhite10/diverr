const { encryptPassword, generateError } = require('../helpers');
const { getConnection } = require('./getDB');

const createUser = async (email, password, name) => {
  let connection;
  try {
    connection = await getConnection();

    const passwordHash = await encryptPassword(password);
    //Crear el usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email,password,name,createdAt,lastAuthUpdate)
    VALUES (?,?,?,UTC_TIMESTAMP,UTC_TIMESTAMP)`,
      [email, passwordHash, name]
    );

    //Devolvemos el id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id,email,password,role
    FROM users
    WHERE email = ?`,
      [email]
    );

    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
      SELECT id,email,name,bio,avatar,role,
      lastAuthUpdate,createdAt,modifiedAt
      FROM users
      WHERE id = ?`,
      [id]
    );

    //Si el usuario no existe...
    if (!user[0])
      throw generateError(`No existe ningún usuario con el id ${id}`, 404);
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

const editUserById = async (email, name, bio, avatar, id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
    UPDATE users
    SET email = ?, name = ?, bio = ?, avatar = ?, modifiedAt = UTC_TIMESTAMP
    WHERE id = ?`,
      [email, name, bio, avatar, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

const deleteUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    //Borramos todos los comentarios del usuario
    await connection.query(
      `
    DELETE FROM services_comments
    WHERE idUser = ?`,
      [id]
    );
    //Borramos todas las soluciones asignadas al usuario
    await connection.query(
      `
    DELETE FROM services_solution
    WHERE idUser = ?`,
      [id]
    );
    //Borramos cualquier necesidad que haya generado el usuario
    await connection.query(
      `
    DELETE FROM services
    WHERE idUser = ?`,
      [id]
    );
    //Borramos al usuario
    await connection.query(
      `
      DELETE FROM users 
      WHERE id = ?
    `,
      [id]
    );
    await connection.query(`COMMIT`);
  } catch (error) {
    console.log(error);
    await connection.query(`ROLLBACK`);
  } finally {
    if (connection) connection.release();
  }
};

const editUserPasswordById = async (id, password) => {
  let connection;
  try {
    connection = await getConnection();
    //Encriptamos la password
    const passwordHash = await encryptPassword(password);

    await connection.query(
      `
      UPDATE users
      SET password = ?, modifiedAt = UTC_TIMESTAMP, lastAuthUpdate=UTC_TIMESTAMP
      WHERE id = ?`,
      [passwordHash, id]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  editUserById,
  deleteUserById,
  editUserPasswordById,
};
