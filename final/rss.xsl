<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:rss="http://purl.org/rss/1.0/">

  <xsl:output method="html" encoding="utf-8" />

  <xsl:template match="/">
    <h1>
      <a>
	<xsl:attribute name="href">
	  <xsl:value-of select="rdf:RDF/rss:channel/rss:link" />
	</xsl:attribute>
	<xsl:value-of select="rdf:RDF/rss:channel/rss:title" />
      </a>
    </h1>
    <dl>
      <xsl:for-each select="//rss:item">
	<dt>
	  <a>
	    <xsl:attribute name="href">
	      <xsl:value-of select="rss:link" />
	    </xsl:attribute>
	    <xsl:value-of select="rss:title" />
	  </a>
	</dt>
	<dd>
	  <xsl:value-of select="rss:description//text()" />
	</dd>
      </xsl:for-each>
    </dl>
  </xsl:template>

</xsl:stylesheet>
