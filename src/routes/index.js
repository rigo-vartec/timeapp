const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/inicio/maquina/:inicio", (req, res) => {
  const { inicio } = req.params;
  res.render("maquinas-user/" + inicio);
});

router.get("/user/logged/:rol", async (req, res) => {
  const { rol } = req.params;
  const maquina = await db.query(
    "SELECT * FROM averias_cerradas WHERE user_id=? order by id desc LIMIT 1",
    [req.user.id]
  );
  res.render("formularios/" + rol, { maquina });
});

router.get("/inicio/logged/:inicio", async (req, res) => {
  const { inicio } = req.params;
  const data_user = await db.query(
    "SELECT * FROM users WHERE id=? order by id desc LIMIT 1",
    [req.user.id]
  );
  res.render("maquinas-user/" + inicio, { data_user });
});

router.post("/incidencia/add", async (req, res) => {
  let username = req.body.num_ope;
  let maquina = req.body.num_machine;
  const {
    creation_date,
    turno,
    num_machine,
    start_date,
    start_time,
    step,
    page,
  } = req.body;
  const newave = {
    creation_date,
    turno,
    num_machine,
    num_ope: req.user.username,
    start_date,
    start_time,
    step,
    page
  };
  const row = await db.query(
    'SELECT * FROM users WHERE username = ? AND rol="operador_corte"',
    [username]
  );
  if (row.length > 0) {
    const id = row[0];
    const user_id = id.id;
    const averias = await db.query(
      'SELECT* FROM incidencias WHERE num_ope = ?  AND step = "1" order by id desc limit 1',
      [username]
    );
    if (averias.length > 0) {
      const user = averias[0];
      res.render("incidencias/" + user.page, { averias, row });
    } else {
      const averia = await db.query("INSERT INTO incidencias set?", [newave]);
      await db.query("UPDATE incidencias set user_id=?  WHERE id = ?", [
        user_id,
        averia.insertId,
      ]);
      const averias = await db.query("SELECT * FROM incidencias WHERE id=?", [
        averia.insertId,
      ]);
      res.render("incidencias/incidencia", { averias });
    }
  } else {
    req.flash("info", "Por favor introduce un numero de operador valido");
    res.redirect("/inicio/maquina/" + maquina);
  }
});

router.post("/incidencia/new/:id", async (req, res) => {
  const { id } = req.params;
  let maquina = req.body.num_machine;
  const { type_break, end_time, total_time, step } = req.body;
  const newave = {
    type_break,
    end_time,
    total_time,
    step,
  };
  await db.query("UPDATE incidencias set ? WHERE id = ?", [newave, id]);
  req.flash("info", "La incidencia fue cerrada");
  res.redirect("/inicio/maquina/" + maquina);
});

router.post("/averia/add", async (req, res) => {
  let username = req.body.num_ope;
  let maquina = req.body.num_machine;
  const { creation_date, turno, start_date, start_time, step, page } = req.body;
  const newave = {
    creation_date,
    turno,
    num_machine: req.user.machine,
    num_ope: req.user.username,
    start_date,
    start_time,
    step,
    page,
  };
  const row = await db.query(
    'SELECT * FROM users WHERE username = ? AND rol="operador_corte"',
    [username]
  );
  if (row.length > 0) {
    const id = row[0];
    const user_id = id.id;
    const averias = await db.query(
      'SELECT* FROM averias_1 WHERE num_ope = ?  AND step = "1" order by id desc limit 1',
      [username]
    );
    if (averias.length > 0) {
      const user = averias[0];
      const alert2 = "true";
      res.render("averias/" + user.page, { averias, row, alert2 });
    } else {
      const averia = await db.query("INSERT INTO averias_1 set?", [newave]);
      await db.query("UPDATE averias_1 set user_id=?  WHERE id = ?", [
        user_id,
        averia.insertId,
      ]);
      const averias = await db.query("SELECT * FROM averias_1 WHERE id=?", [
        averia.insertId,
      ]);
      res.render("averias/arrival", { averias });
    }
  } else {
    req.flash("info", "Por favor introduce un numero de operador valido");
    res.redirect("/inicio/maquina/" + maquina);
  }
});

router.post("/arrival/validate/:id", async (req, res) => {
  let username = req.body.op_mantto;
  const { id } = req.params;
  const { op_mantto, arrival_time, sub_time, page } = req.body;
  const newave = {
    op_mantto,
    arrival_time,
    sub_time,
    page,
  };
  const row = await db.query(
    'SELECT * FROM users WHERE username = ? AND rol="mantenimiento"',
    [username]
  );
  if (row.length > 0) {
    const id1 = row[0];
    const mantto_id = id1.id;

    await db.query("UPDATE averias_1 set ? WHERE id = ?", [newave, id]);
    const averias = await db.query("SELECT * FROM averias_1 WHERE id=?", [id]);
    const alert = "True";
    res.render("averias/arrival_2", { averias, alert });
  } else {
    const averias = await db.query("SELECT * FROM averias_1 WHERE id=?", [id]);
    const alerta = "True";
    res.render("averias/arrival", { averias, alerta });
  }
});

router.post("/arrival/validate/close/:id", async (req, res) => {
  const { id } = req.params;
  let maquina = req.body.num_machine;
  let username = req.body.op_mantto;
  const { op_mantto, canceled_time, sub_time, step } = req.body;
  const newave = {
    op_mantto,
    canceled_time,
    sub_time,
    step,
  };
  const row = await db.query(
    'SELECT * FROM users WHERE username = ? AND rol="mantenimiento"',
    [username]
  );
  if (row.length > 0) {
    const id1 = row[0];
    const data_user = await db.query(
      "SELECT * FROM users WHERE id=? order by id desc LIMIT 1",
      [req.user.id]
    );
    await db.query("UPDATE averias_1 set ? WHERE id = ?", [newave, id]);
    res.render("maquinas-user/" + maquina, { data_user });
  } else {
    const averias = await db.query("SELECT * FROM averias_1 WHERE id=?", [id]);
    const alerta = "True";
    res.render("averias/arrival", { averias, alerta });
  }
});

router.post("/arrival/validated/:id", async (req, res) => {
  const { id } = req.params;
  const { opening_time, type_break, page } = req.body;
  const newave = {
    opening_time,
    type_break,
    page,
  };
  await db.query("UPDATE averias_1 set ? WHERE id = ?", [newave, id]);
  const averias = await db.query("SELECT * FROM averias_1 WHERE id=?", [id]);
  const alerta = "True";
  res.render("averias/new", { averias, alerta });
});

router.post("/arrival/close/validated/:id", async (req, res) => {
  const { id } = req.params;
  let maquina = req.body.num_machine;
  const {
    creation_date,
    num_machine,
    num_ope,
    turno,
    op_mantto,
    start_time,
    start_date,
    arrival_time,
    sub_time,
    canceled_time,
    total_time,
    type_break,
    user_id,
    mantto_id,
    step,
  } = req.body;
  const newave = {
    canceled_time,
    type_break,
    mantto_id,
    step,
  };
  const newave2 = {
    creation_date,
    num_machine,
    num_ope,
    turno,
    op_mantto,
    start_time,
    start_date,
    arrival_time,
    sub_time,
    canceled_time,
    total_time,
    type_break,
    user_id,
    mantto_id,
  };
  await db.query("INSERT INTO averias_canceladas set?", [newave2]);
  await db.query("UPDATE averias_1 set ? WHERE id = ?", [newave, id]);
  res.redirect("/inicio/maquina/" + maquina);
});

router.post("/averia/new/:id", async (req, res) => {
  const { id } = req.params;
  let maquina = req.body.num_machine;
  const {
    creation_date,
    num_machine,
    num_ope,
    turno,
    op_mantto,
    start_time,
    start_date,
    arrival_time,
    sub_time,
    type_break,
    user_id,
    opening_time,
    end_time,
    total_time,
    mantto_id,
    step,
    description,
  } = req.body;
  const newave = {
    end_time,
    total_time,
    step,
    description,
  };
  const newave2 = {
    creation_date,
    num_machine,
    num_ope,
    turno,
    op_mantto,
    start_time,
    start_date,
    arrival_time,
    sub_time,
    opening_time,
    end_time,
    total_time,
    type_break,
    user_id,
    mantto_id,
    description,
  };
  await db.query("INSERT INTO averias_cerradas set?", [newave2]);
  await db.query("UPDATE averias_1 set ? WHERE id = ?", [newave, id]);
  res.redirect("/inicio/maquina/" + maquina);
});

router.get("/averias/operador/buscar", async (req, res) => {
  const averias = await db.query(
    "SELECT * FROM averias_cerradas WHERE user_id=? AND estatus_corte='indefinido'",
    [req.user.id]
  );
  res.render("averias/operador", { averias });
});

router.get("/averia/corte/cambiar/estatus/:id", async (req, res) => {
  const { id } = req.params;
  const averia = await db.query("SELECT * FROM averias_cerradas WHERE id=?", [
    id,
  ]);
  res.render("averias/modificar", { averia });
});

router.post("/averia/corte/estatus/:id", async (req, res) => {
  const { id } = req.params;
  let estatus_corte = req.body.estatus;
  await db.query("UPDATE averias_cerradas set estatus_corte=? WHERE id=?", [
    estatus_corte,
    id,
  ]);
  req.flash("info", "El estatus de tu averia fue enviado con exito");
  res.redirect("/averias/operador/buscar");
});

router.get("/incidencias/operador/buscar", async (req, res) => {
  const averias = await db.query("SELECT * FROM incidencias WHERE user_id=?", [
    req.user.id,
  ]);
  res.render("incidencias/operador", { averias });
});

router.get("/averias/operador/mantto/buscar", async (req, res) => {
  const averias = await db.query(
    "SELECT * FROM averias_cerradas WHERE mantto_id=? AND estatus_mantto='indefinido'",
    [req.user.id]
  );
  res.render("averias/operador_mantto", { averias });
});

router.get("/averia/mantto/cambiar/estatus/:id", async (req, res) => {
  const { id } = req.params;
  const averia_mantto = await db.query(
    "SELECT * FROM averias_cerradas WHERE id=?",
    [id]
  );
  res.render("averias/modificar", { averia_mantto });
});

router.post("/averia/mantto/estatus/:id", async (req, res) => {
  const { id } = req.params;
  let estatus_corte = req.body.estatus;
  await db.query("UPDATE averias_cerradas set estatus_mantto=? WHERE id=?", [
    estatus_corte,
    id,
  ]);
  req.flash("info", "El estatus de tu averia fue enviado con exito");
  res.redirect("/averias/operador/mantto/buscar");
});

router.get("/averias/operador/calidad/buscar", async (req, res) => {
  const averia_calidad = await db.query(
    "SELECT * FROM averias_cerradas WHERE estatus_mantto='aprobado' AND estatus_calidad='indefinido'",
    [req.user.id]
  );
  res.render("averias/operador_calidad", { averia_calidad });
});

router.get("/averia/calidad/cambiar/estatus/:id", async (req, res) => {
  const { id } = req.params;
  const averia_calidad = await db.query(
    "SELECT * FROM averias_cerradas WHERE id=?",
    [id]
  );
  res.render("averias/modificar", { averia_calidad });
});

router.post("/averia/calidad/estatus/:id", async (req, res) => {
  const { id } = req.params;
  let estatus_corte = req.body.estatus;
  await db.query("UPDATE averias_cerradas set estatus_calidad=? WHERE id=?", [
    estatus_corte,
    id,
  ]);
  req.flash("info", "El estatus de tu averia fue enviado con exito");
  res.redirect("/averias/operador/calidad/buscar");
});

router.post("/incidencia/add", async (req, res) => {
  let username = req.body.num_ope;
  let maquina = req.body.num_machine;
  const {
    creation_date,
    turno,
    num_machine,
    num_ope,
    start_date,
    start_time,
    step,
    page,
  } = req.body;
  const newave = {
    creation_date,
    turno,
    num_machine,
    num_ope,
    start_date,
    start_time,
    step,
    page,
  };
  const row = await db.query(
    'SELECT * FROM users WHERE username = ? AND rol="operador_corte"',
    [username]
  );
  if (row.length > 0) {
    const id = row[0];
    const user_id = id.id;
    const averias = await db.query(
      'SELECT* FROM incidencias WHERE num_ope = ?  AND step = "1" order by id desc limit 1',
      [username]
    );
    if (averias.length > 0) {
      const user = averias[0];
      res.render("incidencias/" + user.page, { averias, row });
    } else {
      const averia = await db.query("INSERT INTO incidencias set?", [newave]);
      await db.query("UPDATE incidencias set user_id=?  WHERE id = ?", [
        user_id,
        averia.insertId,
      ]);
      const averias = await db.query("SELECT * FROM incidencias WHERE id=?", [
        averia.insertId,
      ]);
      res.render("incidencias/incidencia", { averias });
    }
  } else {
    req.flash("info", "Por favor introduce un numero de operador valido");
    res.redirect("/inicio/maquina/" + maquina);
  }
});

router.post("/registro/produccion/maquinas", async (req, res) => {
  let maquina = req.body.num_machine;
  const { turno, num_machine } = req.body;
  const newregs = {
    turno,
    num_machine,
  };
  const row = await db.query(
    "SELECT * FROM produccion WHERE num_machine = ? AND step=1",
    [maquina]
  );
  if (row.length > 0) {
    const registro = await db.query(
      "SELECT * FROM produccion WHERE num_machine = ? AND step=1",
      [maquina]
    );
  } else {
    const registros = await db.query("INSERT INTO produccion set?", [newregs]);
    const registro = await db.query("SELECT * FROM produccion WHERE id=?", [
      registros.insertId,
    ]);
    res.render("produccion/" + turno, { registro });
  }
});

router.get("/produccion/grafica", (req, res) => {
  res.render("produccion/grafica");
});

router.post("/produccion/maquinas/noche/:id", async (req, res) => {
  const { id } = req.params;
  let turno = req.body.turno;
  const { hora_1, hora_2, hora_3, hora_4, hora_5, hora_6, hora_7 } = req.body;
  const newregs = {
    hora_1,
    hora_2,
    hora_3,
    hora_4,
    hora_5,
    hora_6,
    hora_7,
  };
  await db.query("UPDATE produccion set ? WHERE id=?", [newregs, id]);
  const registro = await db.query("SELECT * FROM produccion WHERE id=?", [id]);
  const alert = "true";
  res.render("produccion/" + turno, { registro, alert });
});

router.get("/chat/supervisor/calidad", (req, res) => {
  res.render("chats/chatcalidad");
});

router.get("/pre-tpm", (req, res) => {
  res.render("formularios/pre-tpm");
});

router.get("/tiempo-averias", (req, res) => {
  res.render("averias/tiempos");
});

router.get("/produccion/facilitador", async (req, res) => {
  res.render("produccion/facilitador");
});

router.post("/produccion/bloque1", async (req, res) => {
  let turno = req.body.turno;
  let alert = "true";
  let query = "INSERT INTO produccion_m (num_machine,bloque) VALUES?";
  let query2 = "INSERT INTO produccion_t (num_machine,bloque) VALUES?";
  let query3 = "INSERT INTO produccion_n (num_machine,bloque) VALUES?";
  let values = [['A12','1'],['G01','1'],['A11','1'],['A10','1'],['G04','1']];
  switch (turno) {
    case "MAÑANA":
      const row = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="1"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query, [values]);
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE":
      const row1 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="1"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query2, [values]);
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE:":
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno});
      break;
      case "NOCHE":
      const row2 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="1"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query3, [values]);
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
    default:
      break;
  }
});

router.post("/produccion/bloque2", async (req, res) => {
  let turno = req.body.turno;
  let alert = "true";
  let query = "INSERT INTO produccion_m (num_machine,bloque) VALUES?";
  let query2 = "INSERT INTO produccion_t (num_machine,bloque) VALUES?";
  let query3 = "INSERT INTO produccion_n (num_machine,bloque) VALUES?";
  let values = [['G03','2'],['A03','2'],['G02','2'],['A09','2'],['A01','2']];
  switch (turno) {
    case "MAÑANA":
      const row = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="2"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query, [values]);
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE":
      const row1 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="2"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query2, [values]);
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE:":
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno});
      break;
      case "NOCHE":
        const row2 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="2"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query3, [values]);
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
    default:
      break;
  }
});

router.post("/produccion/bloque3", async (req, res) => {
  let turno = req.body.turno;
  let alert = "true";
  let query = "INSERT INTO produccion_m (num_machine,bloque) VALUES?";
  let query2 = "INSERT INTO produccion_t (num_machine,bloque) VALUES?";
  let query3 = "INSERT INTO produccion_n (num_machine,bloque) VALUES?";
  let values = [['A04','3'],['X06','3'],['A05','3'],['X07','3']];
  switch (turno) {
    case "MAÑANA":
      const row = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="3"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno});
      } else {
        await db.query(query, [values]);
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno,alert});
      }
      break;
      case "TARDE":
      const row1 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="3"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno});
      } else {
        await db.query(query2, [values]);
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno,alert});
      }
      break;
      case "TARDE:":
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno});
      break;
      case "NOCHE":
      const row2 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="3"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno});
      } else {
        await db.query(query3, [values]);
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno,alert});
      }
      break;
    default:
      break;
  }
});

router.post("/produccion/bloque4", async (req, res) => {
  let turno = req.body.turno;
  let alert = "true";
  let query = "INSERT INTO produccion_m (num_machine,bloque) VALUES?";
  let query2 = "INSERT INTO produccion_t (num_machine,bloque) VALUES?";
  let query3 = "INSERT INTO produccion_n (num_machine,bloque) VALUES?";
  let values = [['A06','4'],['A02','4'],['A07','4'],['A08','4'],['A13','4']];
  switch (turno) {
    case "MAÑANA":
      const row = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="4"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query, [values]);
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE":
      const row1 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="4"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query2, [values]);
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
      case "TARDE:":
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno});
      break;
      case "NOCHE":
      const row2 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="4"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno});
      } else {
        await db.query(query3, [values]);
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno,alert});
      }
      break;
    default:
      break;
  }
});

router.post("/produccion/MAÑANA/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "MAÑANA";
  let alert2 = "true";
  const { hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10};
  switch (bloque) {
    case "1":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        const registros = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      break;
    case "2":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        const registros1 = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros1,turno,alert2});
      break;
    case "3":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        const registros2 = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros2,turno,alert2});
    break;
    case "4":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        const registros3 = await db.query('SELECT * FROM produccion_m WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros3,turno,alert2});
    break;
    default:
      break;
  }
});

router.post("/produccion/MAÑANA/final/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "MAÑANA";
  let alert2 = "true";
  const { hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10};
  switch (bloque) {
    case "1":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        
      break;
    case "2":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        
      break;
    case "3":
        
    break;
    case "4":
        await db.query("UPDATE produccion_m set ? WHERE id=?", [newregs, id]);
        
    break;
    default:
      break;
  }
});

router.post("/produccion/TARDE/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "TARDE";
  let alert2 = "true";
  const { hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10};
  await db.query("UPDATE produccion_t set ? WHERE id=?", [newregs, id]);
  switch (bloque) {
    case "1":
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      break;
    case "2":
      const row = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="2"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      }
      break;
    case "3":
      const row1 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="3"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno,alert2});
      }
    break;
    case "4":
      const row2 = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="4"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_t WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      }
    break;
    default:
      break;
  }
});

router.post("/produccion/TARDE/final/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "TARDE";
  let alert2 = "true";
  const { hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7,hora_8,hora_9,hora_10};
  switch (bloque) {
    case "1":
        await db.query("UPDATE produccion_t set ? WHERE id=?", [newregs, id]);
        
      break;
    case "2":
        await db.query("UPDATE produccion_t set ? WHERE id=?", [newregs, id]);
        
      break;
    case "3":
        await db.query("UPDATE produccion_t set ? WHERE id=?", [newregs, id]);
        
    break;
    case "4":
        await db.query("UPDATE produccion_t set ? WHERE id=?", [newregs, id]);
        
    break;
    default:
      break;
  }
});

router.post("/produccion/NOCHE/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "NOCHE";
  let alert2 = "true";
  const { hora_1, hora_2, hora_3, hora_4, hora_5, hora_6, hora_7} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7};
  await db.query("UPDATE produccion_n set ? WHERE id=?", [newregs, id]);
  switch (bloque) {
    case "1":
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="1"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      break;
    case "2":
      const row = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="2"');
      if (row.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="2"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      }
      break;
    case "3":
      const row1 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="3"');
      if (row1.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="3"');
        res.render("produccion/bloque2",{registros,turno,alert2});
      }
    break;
    case "4":
      const row2 = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="4"');
      if (row2.length > 0) {
        const registros = await db.query('SELECT * FROM produccion_n WHERE fecha = CURDATE() AND bloque="4"');
        res.render("produccion/bloque1",{registros,turno,alert2});
      }
    break;
    default:
      break;
  }
});

router.post("/produccion/NOCHE/final/:bloque/:id", async (req, res) => {
  const { id } = req.params;
  let { bloque } = req.params;
  let turno = "NOCHE";
  let alert2 = "true";
  const { hora_1, hora_2, hora_3, hora_4, hora_5, hora_6, hora_7} = req.body;
  const newregs = {hora_1,hora_2,hora_3,hora_4,hora_5,hora_6,hora_7};
  switch (bloque) {
    case "1":
        await db.query("UPDATE produccion_n set ? WHERE id=?", [newregs, id]);
        
      break;
    case "2":
        await db.query("UPDATE produccion_n set ? WHERE id=?", [newregs, id]);
        
      break;
    case "3":
        await db.query("UPDATE produccion_n set ? WHERE id=?", [newregs, id]);
        
    break;
    case "4":
        await db.query("UPDATE produccion_n set ? WHERE id=?", [newregs, id]);

    break;
    default:
      break;
  }
});


module.exports = router;
