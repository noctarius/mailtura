{{- define "mailtura.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "mailtura.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "mailtura.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ include "mailtura.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "mailtura.selectorLabels" -}}
app.kubernetes.io/name: {{ include "mailtura.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "mailtura.envSecretName" -}}
{{- printf "%s-env" (include "mailtura.fullname" .) -}}
{{- end -}}

{{- define "mailtura.databaseUrl" -}}
{{- if .Values.externalDatabase.enabled -}}
{{- required "externalDatabase.url is required when externalDatabase.enabled=true" .Values.externalDatabase.url -}}
{{- else if .Values.stackgres.enabled -}}
{{- $username := required "stackgres.credentials.superuser.username is required" .Values.stackgres.credentials.superuser.username -}}
{{- $password := required "stackgres.credentials.superuser.password is required" .Values.stackgres.credentials.superuser.password -}}
{{- $database := default "postgres" .Values.stackgres.database.name -}}
{{- $host := default "stackgres" .Values.stackgres.cluster.name -}}
{{- printf "postgres://%s:%s@%s:5432/%s" $username $password $host $database -}}
{{- else -}}
{{- required "Set externalDatabase.url when stackgres.enabled=false" .Values.externalDatabase.url -}}
{{- end -}}
{{- end -}}

{{- define "mailtura.temporalAddress" -}}
{{- if .Values.env.temporal.address -}}
{{- .Values.env.temporal.address -}}
{{- else if .Values.temporal.enabled -}}
{{- if .Values.temporal.fullnameOverride -}}
{{- printf "%s-frontend:7233" .Values.temporal.fullnameOverride -}}
{{- else -}}
{{- printf "temporal-frontend:7233" -}}
{{- end -}}
{{- else -}}
{{- required "env.temporal.address is required when temporal.enabled=false" .Values.env.temporal.address -}}
{{- end -}}
{{- end -}}

{{- define "mailtura.apiBaseUrl" -}}
{{- if .Values.env.apiBaseUrl -}}
{{- .Values.env.apiBaseUrl -}}
{{- else -}}
{{- printf "http://%s:%v/api/v1" (include "mailtura.fullname" .) .Values.mailtura.service.port -}}
{{- end -}}
{{- end -}}
