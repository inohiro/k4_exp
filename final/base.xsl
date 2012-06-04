<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:rss="http://purl.org/rss/1.0/">

  <xsl:output method="html" encoding="utf-8" />

  <xsl:template match="/">
    <xsl:for-each select="//rss:item">
      <div>
	<xsl:attribute name="class">
	  <xsl:if test="position() mod 2=0">even</xsl:if>
	  <xsl:if test="position() mod 2=1">odd</xsl:if>
	</xsl:attribute>
	<a target="blank">
	  <xsl:attribute name="href">
	    <xsl:value-of select="rss:link" />
	  </xsl:attribute>
	  <xsl:value-of select="rss:title" />	  
	</a>
	- 
	<a target="_blank">
	  <xsl:attribute name="href">
	    http://b.hatena.ne.jp/append?<xsl:value-of select="rss:link" />
	  </xsl:attribute>
	  はてなブックマークに追加
	</a>
	<p>
	  <xsl:value-of select="rss:description//text()" />
	</p>
	<button>
	  <xsl:attribute name="onclick">loadComments( '<xsl:value-of select="rss:link" />' )</xsl:attribute>
	  ブックマークへのコメントを表示する
	</button>
	<div class="b_comment">
	  <xsl:attribute name="id">
	    <xsl:value-of select="rss:link" />
	  </xsl:attribute>
	</div>
      </div>
    </xsl:for-each>

  </xsl:template>

</xsl:stylesheet>
