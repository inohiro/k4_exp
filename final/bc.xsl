<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:rss="http://purl.org/rss/1.0/">

  <xsl:output method="html" encoding="utf-8" />

  <xsl:template match="/">
    <button>
      <xsl:attribute name="onclick">closeComments( '<xsl:value-of select="rdf:channel" />' )</xsl:attribute>
      ブックマークへのコメントを閉じる
    </button>
    <ul>
      <xsl:for-each select="//rss:item">
	<xsl:if test="rss:description//text()!=''">
	  <li>
	    <xsl:attribute name="class">
	      <xsl:if test="position() mod 2=0">bc_even</xsl:if>
	      <xsl:if test="position() mod 2=1">bc_odd</xsl:if>
	    </xsl:attribute>
	    <xsl:value-of select="rss:description//text()" /> -
	    <a target="blank" class="bc">
	      <xsl:attribute name="href">
		<xsl:value-of select="rss:link" />
		</xsl:attribute>
	      <xsl:value-of select="rss:title" />
	    </a>
	  </li>
	</xsl:if>
      </xsl:for-each>
    </ul>
    <button>
      <xsl:attribute name="onclick">closeComments( '<xsl:value-of select="rdf:channel" />' )</xsl:attribute>
      ブックマークへのコメントを閉じる
    </button>
  </xsl:template>

</xsl:stylesheet>
