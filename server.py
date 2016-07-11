import os
import bottle
from bottle import route
import pymysql.cursors
STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static')

def getItemsCount(conn, table):
    html = ""
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM " + table)

    html += "<table class='stat-table'>"
    html += '<tr>'
    html += "<td class='stat-td'>" + table + '</td>'

    html += "<td class='stat-td'>"
    html += str(cur.fetchone()[0])
    html += '</td>'

    html += '</tr>'
    html += '</table>'

    cur.close()
    return html

def getDatabaseData(host, port, user, password, db):
    html = ""
    try:
        conn = pymysql.connect(host=host, port=port, user=user, passwd=password, db=db)

        html += "<div class='stat-repeater'>"
        html += getItemsCount(conn, 'categories')
        html += getItemsCount(conn, 'currencies')
        html += getItemsCount(conn, 'expenses')
        html += getItemsCount(conn, 'receipts')
        html += getItemsCount(conn, 'reports')
        html += getItemsCount(conn, 'vendors')
        html += "</div>"
        conn.close()
    except pymysql.OperationalError as e:
        code, message = e.args
        html = "Cannot connect to the database. " + host + ":" + str(port) + "<br>" + message
    return html

@route('/')
def index():
    host = os.getenv("MYSQL_HOST", "192.168.100.20")
    db = os.getenv("MYSQL_DB", "hpsa_demo")
    port = int(os.getenv("MYSQL_PORT", "3306"))
    user = os.getenv("MYSQL_USER", "root")
    password = os.getenv("MYSQL_PASS", "root")
    provider = os.getenv("PROVIDER", "Python")
    content = getDatabaseData(host, port, user, password, db)
    indexfile = open("./index.html", 'rb').read().replace("@@provider@@", provider)
    indexfile = indexfile.replace("@@content@@", content)
    return indexfile

@route('/static/:filename')
def serve_static(filename):
    return bottle.static_file(filename, root=STATIC_ROOT)

@route('/static/fonts/:filename')
def serve_static(filename):
    return bottle.static_file(filename, root=(STATIC_ROOT + "/fonts/"))



application = bottle.app()
application.catchall = False

bottle.run(application, host='0.0.0.0', port=os.getenv('PORT', 8001))
