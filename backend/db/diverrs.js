const { generateError } = require('../helpers');
const { getConnection } = require('./getDB');

const searchDiverrs = async (search, orderBy, orderDirection) => {
  let connection;
  try {
    connection = await getConnection();
    let queryResults;

    //Si se pasa un filtro de búsqueda...
    if (search) {
      queryResults = await connection.query(
        `
          SELECT D.id, D.idUser, U.name as user, D.title,D.picture,D.price, D.info, D.file, DC.description as category, DS.description as status, D.createdAt
          FROM diverrs AS D
          INNER JOIN diverrs_categories AS DC
          ON D.idCategory = DC.id
          INNER JOIN diverrs_status AS DS
          ON D.idStatus = DS.id
          INNER JOIN users AS U
          ON D.idUser = U.id
          WHERE D.title LIKE '%${search}%' OR D.info LIKE '%${search}%'
          ORDER BY D.${orderBy} ${orderDirection}`
      );
    } else {
      queryResults = await connection.query(
        `
          SELECT D.id, D.idUser, U.name as user, D.title,D.picture,D.price, D.info, D.file, DC.description as category, DS.description as status, D.createdAt
          FROM diverrs AS D
          INNER JOIN diverrs_categories AS DC
          ON D.idCategory = DC.id
          INNER JOIN diverrs_status AS DS
          ON D.idStatus = DS.id
          INNER JOIN users AS U
          ON D.idUser = U.id
          ORDER BY D.${orderBy} ${orderDirection}`
      );
    }
    //Extraemos los resultados en un array
    const [results] = queryResults;
    return results;
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [diverr] = await connection.query(
      `
        SELECT D.id, D.idUser, U.name as user, D.title, D.info, D.file, DC.description as category, DS.description as status, D.createdAt
        FROM diverrs AS D
        INNER JOIN diverrs_categories AS DC
        ON D.idCategory = DC.id
        INNER JOIN diverrs_status AS DS
        ON D.idStatus = DS.id
        INNER JOIN users AS U
        ON D.idUser = U.id
        WHERE D.id = ?`,
      [id]
    );

    if (!diverr[0])
      throw generateError(`No existe ningún diverr con id ${id}`, 404);

    return diverr[0];
  } finally {
    if (connection) connection.release();
  }
};
const createDiverr = async (
  idUser,
  title,
  info,
  file,
  picture,
  price,
  category
) => {
  let connection;
  try {
    connection = await getConnection();

    const [newDiverr] = await connection.query(
      `
      INSERT INTO diverrs (idUser,title, info, file, picture, price, idCategory, idStatus, createdAt)
      VALUES(?,?,?,?,?,?,?,1,UTC_TIMESTAMP)
    `,
      [idUser, title, info, file, picture, price, category]
    );
    return newDiverr.insertId;
  } finally {
    if (connection) connection.release();
  }
};
const editDiverrById = async (
  idService,
  title,
  info,
  file,
  picture,
  price,
  category
) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE diverrs
      SET title = ?, info = ?, file = ?,picture=?,price = ?, idCategory = ?, modifiedAt = UTC_TIMESTAMP
      WHERE id = ?`,
      [title, info, file, picture, price, category, idService]
    );
  } finally {
    if (connection) connection.release();
  }
};
const deleteDiverrById = async (idDiverr) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    await connection.query(
      `
    DELETE FROM diverrs_comments
    WHERE idDiverr = ?`,
      [idDiverr]
    );
    await connection.query(
      `
      DELETE FROM diverrs
      WHERE id = ?`,
      [idDiverr]
    );
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
    throw generateError(error);
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrSolutionById = async (idDiverr) => {
  let connection;
  try {
    connection = await getConnection();
    const [solution] = await connection.query(
      `
      SELECT DS.id, DS.idUser, U.name as user, DS.file, DS.startedAt, DS.finishedAt, DS.markAsFinished
      FROM diverrs_solution AS DS
      INNER JOIN users AS U
      ON DS.idUser = U.id
      WHERE DS.idDiverr = ?`,
      [idDiverr]
    );
    return solution[0];
  } finally {
    if (connection) connection.release();
  }
};
const createDiverrSolution = async (idDiverr, idUser) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);
    const [newSolution] = await connection.query(
      `
      INSERT INTO diverrs_solution (idDiverr,idUser,startedAt)
      VALUES (?,?,UTC_TIMESTAMP)`,
      [idDiverr, idUser]
    );
    await connection.query(
      `
      UPDATE diverrs
      SET idStatus = 2
      WHERE id = ?`,
      [idDiverr]
    );
    await connection.query(`COMMIT`);
    return newSolution.insertId;
  } catch (error) {
    await connection.query(`ROLLBACK`);
    throw generateError(error);
  } finally {
    if (connection) connection.release();
  }
};
const editDiverrSolutionById = async (idDiverr, file, finished) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);

    if (finished.toLowerCase() === 'true') {
      await connection.query(
        `
      UPDATE diverrs_solution
      SET file = ?, finishedAt = UTC_TIMESTAMP, markAsFinished = 1
      WHERE idDiverr = ?`,
        [file, idDiverr]
      );
      await connection.query(
        `
      UPDATE diverrs
      SET idStatus = 3
      WHERE id = ?`,
        [idDiverr]
      );
    } else {
      await connection.query(
        `
        UPDATE diverrs_solution
        SET file = ?
        WHERE idDiverr = ?`,
        [file, idDiverr]
      );
    }
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
    throw generateError(error);
  } finally {
    if (connection) connection.release();
  }
};
const deleteDiverrSolutionById = async (idDiverr) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`START TRANSACTION`);

    await connection.query(
      `
    UPDATE diverrs
    SET idStatus = 1
    WHERE id = ?`,
      [idDiverr]
    );
    await connection.query(
      `
    DELETE FROM diverrs_solution
    WHERE idDiverr = ?`,
      [idDiverr]
    );
    await connection.query(`COMMIT`);
  } catch (error) {
    await connection.query(`ROLLBACK`);
    throw generateError(error);
  } finally {
    if (connection) connection.release();
  }
};
const getIdCategory = async (category) => {
  let connection;
  try {
    connection = await getConnection();

    const [idCategory] = await connection.query(
      `SELECT id 
      FROM diverrs_categories WHERE description = ? 
      `,
      [category]
    );
    if (!idCategory[0])
      throw generateError(`La categoria ${category} no existe`, 404);
    return idCategory[0];
  } finally {
    if (connection) connection.release();
  }
};
const createServiceComment = async (idUser, idDiverr, content) => {
  let connection;
  try {
    connection = await getConnection();

    const [newServiceComment] = await connection.query(
      `
      INSERT INTO diverrs_comments (idUser, idDiverr, content, createdAt)
      VALUES(?,?,?,UTC_TIMESTAMP)
    `,
      [idUser, idDiverr, content]
    );
    return newServiceComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};
const editDiverrCommentById = async (idDiverr, idComment, content) => {
  let connection;
  try {
    connection = await getConnection();

    const [newServiceComment] = await connection.query(
      `
      UPDATE diverrs_comments 
      SET content = ?, modifiedAt = UTC_TIMESTAMP
      WHERE idDiverr = ? AND id = ?
    `,
      [content, idDiverr, idComment]
    );
    return newServiceComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrCommentById = async (idComment, idDiverr) => {
  let connection;
  try {
    connection = await getConnection();
    const [comment] = await connection.query(
      `
      SELECT DC.id, DC.content, U.name, DC.idUser, DC.idDiverr, DC.createdAt, DC.modifiedAt
      FROM diverrs_comments AS DC
      INNER JOIN users AS U
      ON U.id = DC.idUser
      WHERE DC.id = ? AND DC.idDiverr = ?`,
      [idComment, idDiverr]
    );
    if (!comment[0])
      throw generateError(
        `No existe ningún comentario con id ${idComment}`,
        404
      );
    return comment[0];
  } finally {
    if (connection) connection.release();
  }
};
const deleteDiverrCommentById = async (idComment) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `
      DELETE FROM diverrs_comments
      WHERE id = ?`,
      [idComment]
    );
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrComments = async (idDiverr) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT DC.id, DC.content, U.name, DC.idUser, DC.idDiverr, DC.createdAt, DC.modifiedAt
      FROM diverrs_comments AS DC
      INNER JOIN users AS U
      ON U.id = DC.idUser
      WHERE DC.idDiverr = ?`,
      [idDiverr]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrsCategories = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT id,description
      FROM diverrs_categories`
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const getDiverrsStatus = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT id,description
      FROM diverrs_status`
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  searchDiverrs,
  getDiverrSolutionById,
  getDiverrById,
  deleteDiverrById,
  createDiverrSolution,
  createDiverr,
  getIdCategory,
  createServiceComment,
  deleteDiverrCommentById,
  editDiverrById,
  editDiverrSolutionById,
  deleteDiverrSolutionById,
  getDiverrCommentById,
  getDiverrComments,
  editDiverrCommentById,
  getDiverrsCategories,
  getDiverrsStatus,
};
