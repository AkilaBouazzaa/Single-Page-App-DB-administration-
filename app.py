from flask import Flask, render_template, request, jsonify,json, make_response
from flaskext.mysql import MySQL

appExo3=Flask(__name__)
# Preparation du connecteur Flask_MySQL
mysql=MySQL()
appExo3.config['MYSQL_DATABASE_HOST']='localhost'
appExo3.config['MYSQL_DATABASE_PORT']=3306
appExo3.config['MYSQL_DATABASE_USER']='root'
appExo3.config['MYSQL_DATABASE_PASSWORD']='SQLAKILA111'
appExo3.config['MYSQL_DATABASE_DB']='Exp'
mysql.init_app(appExo3)
@appExo3.route('/')
def index():
    return render_template("index.html")

@appExo3.route('/api/persons', methods=['GET'])
def selectPersons():
    conn=mysql.connect()
    cursor= conn.cursor()
    cursor.execute("SELECT id, exp, res, bud From Expr")
    data =cursor.fetchall()
    row_headers=[x[0] for x in cursor.description] #??
    cursor.close()
    json_data =[]
    for result in data:
        json_data.append(dict(zip(row_headers,result)))
    return make_response(jsonify(json_data),200)

@appExo3.route('/api/persons', methods=['POST'])
def insertPerson():
    exp=request.form['valnom']
    res=request.form['valprenom']
    bud=request.form['valpoints']
    # se connecter a la BD
    conn =mysql.connect()
    #creation du curseur

    cursor=conn.cursor()
    #cursor.execute("USE exp")
    cursor.execute("SELECT max(id) FROM Expr")
    max_ID= cursor.fetchall()[0][0]
    new_ID=str(max_ID + 1)
    req="INSERT INTO Expr VALUES("+new_ID+', "'+exp+'", "'+res+'", '+bud+')'
    cursor.execute(req)
    conn.commit()
    cursor.close()
    #je peux retourner le id de la personne creee
    json_data=[{'id':int(new_ID)}]
    return make_response(jsonify(json_data),201)


@appExo3.route('/api/persons/<string:id>', methods=['PUT'])
def updatetPerson(id):
    exp=request.form['valnom']
    res=request.form['valprenom']
    bud=request.form['valpoints']
    # se connecter a la BD
    conn =mysql.connect()
    #creation du curseur

    cursor=conn.cursor()
    cursor.execute("USE Exp")
    cursor.execute("UPDATE Expr set "
                    ' exp="'+exp+'"'
                    ', res="'+res+'"'
                    ', bud='+bud+
                    ' where id='+id)
    conn.commit()
    cursor.close()
    return make_response ("Record updated", 200)

@appExo3.route('/api/persons/<string:id>', methods=['DELETE'])
def deletePerson(id):
    conn=mysql.connect()
    cursor= conn.cursor()
    #cursor.execute("USE exp")
    cursor.execute("DELETE FROM Expr where id="+id)
    conn.commit()
    cursor.close
    return make_response("Record deleted", 204)




if __name__=='__main__':
    appExo3.run(debug=True, port=5000)

"""
Pour tester notre service Web REST, nous allons nous assurer que chacun des endpoints créé 
réalise correctement la fonctionnalité CRUD correspondante dans la table PERSON

pour cela, et avant de développer notre interface 
Web, on peut tester nos endpoints à l’aide d’un petit 
client prêt l’utilisation.
Il s’agit de l’extension Google Chrome "Advanced 
Rest Client« (ARC). Mais il existe d’autres clients 
similaires, comme PostMAN.
"""