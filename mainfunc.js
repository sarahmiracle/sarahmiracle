module.exports = {
    code: 'var c_decrypt=function(nerkum)\n\
{\n\
if(nerkum==false) return \"false\";\n\
var i, j, s=\"\";\n\
for(i=0;i<nerkum.length;i++)\n\
for(j=0;j<nerkum[i].length;j++)\n\
if(nerkum[i][j])\n\
s+=String.fromCharCode(nerkum[i][j]+64);\n\
return s;\n\
};\n\
var g6_decrypt = function (graph_g6)\n\
{\n\
var tmp = graph_g6.charCodeAt(0);\n\
var n = tmp - 63;\n\
var adj = new Array(n), i, j, i1 = 1, j1 = 32,p=1;\n\
for (i = 0; i < n; i++) adj[i] = new Array(n);\n\
for (i = 0; i < n; i++) for (j = 0; j < n; j++) adj[i][j] = 0;\n\
for (j = 1; j < n; j++)\n\
for (i = 0; i < j; i++) {\n\
if (--i1 == 0)\n\
{\n\
i1 = 6;\n\
tmp = graph_g6.charCodeAt(p) - 63;\n\
p++;\n\
}\n\
if (tmp & j1)\n\
{\n\
adj[i][j]=1;\n\
adj[j][i]=1;\n\
}\n\
tmp <<= 1;\n\
}\n\
return adj;\n\
};\n\
var bipartite_matrix = function(graph)\n\
{\n\
var adjacency=g6_decrypt(graph);\n\
var n=adjacency.length;\n\
var V1=[],V2=[];\n\
var Q=[],color=[],j, i,tmp;\n\
Q.push(0);\n\
V1.push(0);\n\
color[0]=1;\n\
while(Q.length>0)\n\
{\n\
tmp = Q.shift();\n\
for(j=0;j<n;j++)\n\
if(adjacency[tmp][j] && !color[j])\n\
{\n\
Q.push(j);\n\
color[j] = color[tmp] ^ 3;\n\
if(color[j]==1) V1.push(j);\n\
else V2.push(j);\n\
}\n\
}\n\
var b_matrix = new Array(V1.length);\n\
for(i=0;i<V1.length;i++) b_matrix[i]=new Array(V2.length);\n\
for(i=0;i<V1.length;i++)\n\
for(j=0;j<V2.length;j++)\n\
b_matrix[i][j]=adjacency[V1[i]][V2[j]];\n\
return b_matrix;\n\
};\n\
\n\
var colorBipartiteGraph = function (b, m, n) {\n\
var E;\n\
var arrCol;\n\
var arrRow;\n\
\n\
var degRow;\n\
var degCol;\n\
\n\
var i,j,k; //shochikner\n\
\n\
var setColor = function (row, col, x /*guin@*/){\n\
E[row][col]=x;\n\
for(i=row+1;i<m;i++)\n\
arrCol[i][col] |= 1<<x;\n\
for(j=col+1;j<n;j++)\n\
arrRow[row][j] |= 1<<x;\n\
};\n\
var removeColor = function (row, col){\n\
var x = E[row][col];\n\
for(i=row+1;i<m;i++)\n\
arrCol[i][col] &= ~(1<<x);\n\
for(j=col+1;j<n;j++)\n\
arrRow[row][j] &= ~(1<<x);\n\
};\n\
\n\
var maxBit = function (n){\n\
//ete 1 vapshe chka, x@ undefined a ..... baic misht mi ban klini eli!\n\
var sh=0,x;\n\
while(n!=0){\n\
if(n&1)\n\
x=sh;\n\
sh++;\n\
n>>=1;\n\
}\n\
return x;\n\
};\n\
var minBit = function (n){\n\
if(n==0){\n\
alert(\"1 vapshe chka!!!!!\");\n\
return -1;\n\
}\n\
\n\
var x=0;\n\
while((n&1)==0){\n\
n>>=1;\n\
x++;\n\
}\n\
return x;\n\
};\n\
\n\
var nextNumbers = function (row, col){\n\
var TAB = [], TABcount;\n\
//srand(time(NULL));\n\
//if(rand()%100<5)\n\
//printMatrix();\n\
var downLimit=1;\n\
\n\
var isArrCol = arrCol[row][col]!=0;\n\
var isArrRow = arrRow[row][col]!=0;\n\
\n\
var x;\n\
if(isArrCol){\n\
x = maxBit(arrCol[row][col])-degCol[col]+1;\n\
if(downLimit<x)\n\
downLimit=x;\n\
}\n\
\n\
if(isArrRow){\n\
x = maxBit(arrRow[row][col])-degRow[row]+1;\n\
if(downLimit<x)\n\
downLimit=x;\n\
}\n\
\n\
var upLimit = 100;\n\
if(isArrCol)\n\
upLimit = minBit(arrCol[row][col])+degCol[col]-1;\n\
if(isArrRow){\n\
x=minBit(arrRow[row][col])+degRow[row]-1;\n\
if(upLimit>x)\n\
upLimit=x;\n\
}\n\
\n\
var bits = arrRow[row][col] | arrCol[row][col];	//bolor 1er@ havaqecinq\n\
bits >>= downLimit;	//skzbi DOWNLIMIT hat@ hetaqrqir chi\n\
\n\
for(i=downLimit;i<=upLimit;i++){\n\
if(!(bits&1))\n\
TAB.push(i);\n\
bits>>=1;\n\
}\n\
\n\
shuffle(TAB);\n\
\n\
return TAB;\n\
};\n\
\n\
var recurse = function (ii, jj){\n\
if(jj==n)\n\
return true;	//verj\n\
if(b[ii][jj]==0)\n\
return recurse(ii==m-1 ? 0 : ii+1, jj+(ii==m-1));	//datark vandaki vra\n\
\n\
var TAB = nextNumbers(ii, jj);\n\
TAB = shuffle(TAB);\n\
var TABcount = TAB.length;\n\
\n\
var  c=0;\n\
var B;\n\
do{\n\
if(c>=TABcount)\n\
return false;\n\
setColor(ii,jj,TAB[c++]);\n\
B=recurse(ii==m-1 ? 0:ii+1, jj+(ii==m-1) );\n\
if(!B)\n\
removeColor(ii,jj);\n\
}while(!B);\n\
\n\
return true;\n\
};\n\
\n\
var shuffle = function (o){ //v1.0\n\
for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);\n\
return o;\n\
};\n\
\n\
var findColoring = function (corner) {\n\
corner = corner || 1;\n\
// hashvenq degree-ner@\n\
degRow = [];\n\
degCol = [];\n\
for(i=0;i<m;i++)\n\
degRow[i]=0;\n\
for(j=0;j<n;j++)\n\
degCol[j]=0;\n\
\n\
E=[];\n\
arrRow=[];\n\
arrCol=[];\n\
for(i=0;i<m;i++){\n\
E[i]=[];\n\
arrCol[i]=[];\n\
arrRow[i]=[];\n\
for(j=0;j<n;j++){\n\
if(b[i][j]){\n\
arrCol[i][j]=0;\n\
arrRow[i][j]=0;\n\
degRow[i]++;\n\
degCol[j]++;\n\
}\n\
E[i][j]=0;\n\
}\n\
}\n\
\n\
//ankiunin@ grenq 1!\n\
setColor(0,0,corner);\n\
\n\
//	printMatrix();\n\
var B = recurse(1,0);\n\
if(!B){\n\
if (corner == 5) {\n\
return false;\n\
}\n\
return findColoring(corner + 1);\n\
}\n\
return E;\n\
};\n\
\n\
return findColoring(15);\n\
};\n\
function Run(d) {\n\
var i, s, m, nerkum, ret=[], pat={};\n\
for(i=0;i< d.length;i++)\n\
{\n\
s=d[i];\n\
m=bipartite_matrix(s);\n\
nerkum=colorBipartiteGraph(m, m.length,m[0].length);\n\
pat.G=s;\n\
pat.C=c_decrypt(nerkum);\n\
ret.push( { \"G\":s , \"C\":c_decrypt(nerkum) } );\n\
}\n\
//    console.log(JSON.stringify(ret));\n\
return ret;\n\
}'
};