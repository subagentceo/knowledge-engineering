import yaml, glob, sqlglot
from sqlglot import exp
issues=0; n=0
for f in sorted(glob.glob('data/models/fivetran/compliance/*.yaml')+glob.glob('data/models/fivetran/platform/*.yaml')):
    doc=yaml.safe_load(open(f))
    if not doc: continue
    n+=1
    name=doc['metadata']['name']; ddl=doc['spec']['ddl']
    ycols=[c['name'] for c in doc['spec']['columns']]; pk=doc['spec']['primary_key']
    tree=sqlglot.parse_one(ddl, read='postgres')
    ddl_cols=[c.name for c in tree.find_all(exp.ColumnDef)]
    if ddl_cols!=ycols: print(f"[{name}] mismatch"); issues+=1
    if len(pk)>1 and 'PRIMARY KEY (' not in ddl: print(f"[{name}] pk missing"); issues+=1
print(f"validated files={n} issues={issues}")
